import merge from 'deepmerge';
import propTypes from 'prop-types';
import processObjectEntries from './helpers/process-object-entries';
import flatten from './helpers/array-flatten';
import Fragment from './fragment';
import Context from './context';
import parseEmlStyles from './parse-eml-styles';
import replaceAttrFormat from './replace-attr-format';

// const DEV = typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production';
const DEV = true;

class JsxRenderer {
	constructor(nodeOrNodes) {
		this.idIndex = 0;

		return this.render(nodeOrNodes);
	}

	render(nodeOrNodes, context) {
		const ctor = this.constructor;

		const rendered = (
			ctor.renderIfNull(nodeOrNodes)
			|| ctor.renderIfStringOrNumber(nodeOrNodes)
			|| this.renderIfArray(nodeOrNodes, context)
			|| this.renderIfFragment(nodeOrNodes, context)
			|| this.renderIfContext(nodeOrNodes, context)
			|| this.renderIfElement(nodeOrNodes, context)
			|| this.renderIfComponent(nodeOrNodes, context)
		);

		if (rendered) {
			return rendered;
		} else {
			throw new Error('Incorrect element type');
		}
	}

	static getId(index) {
		return 'el-' + index;
	}

	static renderIfNull(node) {
		return node === null || node === undefined
			? { css: null, html: '' }
			: null;
	}

	static renderIfStringOrNumber(node) {
		return typeof node === 'string' || typeof node === 'number'
			? { css: null, html: String(node) }
			: null;
	};

	renderIfArray(nodeOrNodes, context) {
		return Array.isArray(nodeOrNodes)
			? nodeOrNodes.reduce((acc, child) => {
				const renderedChild = this.render(child, context);
				return {
					css: { ...acc.css, ...renderedChild.css },
					html: Array.isArray(renderedChild.html)
						? [...acc.html, ...flatten(renderedChild.html, Infinity)]
						: [...acc.html, renderedChild.html]
				}
			}, { css: null, html: [] })
			: null;
	}

	renderIfElement(node, context) {
		if (!node || typeof node.type !== 'string') {
			return null;
		}

		const { children, ...attrs } = node.props;

		let css;

		if (attrs.style) {
			const nextId = this.constructor.getId(this.idIndex + 1);
			const { mediaCss, inlineStyles } = parseEmlStyles(attrs.style, nextId);

			if (Object.keys(inlineStyles).length > 0) {
				attrs.style = inlineStyles;
			}

			if (Object.keys(mediaCss).length > 0) {
				this.idIndex++;
				css = mediaCss;
				attrs.id = this.constructor.getId(this.idIndex);
			}
		}

		const renderedChildren = children.reduce((acc, child) => {
			const renderedChild = this.render(child, context);
			return {
				css: { ...acc.css, ...renderedChild.css },
				html: Array.isArray(renderedChild.html)
					? [...acc.html, ...renderedChild.html]
					: [...acc.html, renderedChild.html]
			};
		}, { css: null, html: [] });

		return {
			css: css ? merge(css, renderedChildren.css) : renderedChildren.css,
			html: {
				tagName: node.type,
				attrs: processObjectEntries(attrs, (key, value) => [replaceAttrFormat(key), value]),
				children: renderedChildren.html
			}
		};
	}

	renderIfFragment(node, context) {
		if (!node || node.type !== Fragment) {
			return null;
		}

		return node.props.children.reduce((acc, child) => {
			const renderedChild = this.render(child, context);
			return {
				css: { ...acc.css, ...renderedChild.css },
				html: Array.isArray(renderedChild.html)
					? [...acc.html, ...renderedChild.html]
					: [...acc.html, renderedChild.html]
			};
		}, { css: null, html: [] });
	}

	renderIfContext(node, context) {
		if (!node || node.type !== Context) {
			return null;
		}

		const { children, ...props } = node.props;
		const mixedContext = { ...context, ...props };

		return children.reduce((acc, child) => {
			const renderedChild = this.render(child, mixedContext);
			return {
				css: { ...acc.css, ...renderedChild.css },
				html: Array.isArray(renderedChild.html)
					? [...acc.html, ...renderedChild.html]
					: [...acc.html, renderedChild.html]
			};
		}, { css: null, html: [] });
	}

	renderIfComponent(node, context) {
		if (!node || !node.type || typeof node.type !== 'function') {
			return null;
		}

		const ctor = node.type;
		const componentName = ctor.name || 'UnknownComponent';
		const isClass = ctor.prototype && ctor.prototype.isComponent;

		if (DEV && 'propTypes' in ctor) {
			propTypes.checkPropTypes(ctor.propTypes, node.props, 'prop', componentName);
		}

		const renderedNode = isClass
			? (new ctor(node.props, context)).render()
			: ctor(node.props, context);

		const rendered = this.render(renderedNode);

		return {
			css: {
				...ctor.css,
				...rendered.css
			} ,
			html: rendered.html
			// html: [
			// 	`<!-- <${componentName}> -->`,
			// 	rendered.html,
			// 	`<!-- </${componentName}> -->`
			// ]
		};
	}
}

export default nodeOrNodes => new JsxRenderer(nodeOrNodes);
