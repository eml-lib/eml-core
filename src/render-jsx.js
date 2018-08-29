import merge from 'deepmerge';
import propTypes from 'prop-types';
import processObjectEntries from './helpers/process-object-entries';
import flatten from './helpers/array-flatten';
import Fragment from './fragment';
import parseEmlStyles from './parse-eml-styles';
import replaceAttrFormat from './replace-attr-format';

// const DEV = typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production';
const DEV = true;

class JsxRenderer {
	constructor(nodeOrNodes) {
		this.idIndex = 0;

		return this.render(nodeOrNodes);
	}

	render(nodeOrNodes) {
		const ctor = this.constructor;

		const rendered = (
			ctor.renderNull(nodeOrNodes)
			|| ctor.renderStringOrNumber(nodeOrNodes)
			|| this.renderArray(nodeOrNodes)
			|| this.renderFragment(nodeOrNodes)
			|| this.renderElement(nodeOrNodes)
			|| this.renderComponent(nodeOrNodes)
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

	static renderNull(nodeOrNodes) {
		return nodeOrNodes === null || nodeOrNodes === undefined
			? { css: null, html: '' }
			: null
	}

	static renderStringOrNumber(nodeOrNodes) {
		return typeof nodeOrNodes === 'string' || typeof nodeOrNodes === 'number'
			? { css: null, html: String(nodeOrNodes) }
			: null
	};

	renderArray(nodeOrNodes) {
		return Array.isArray(nodeOrNodes)
			? nodeOrNodes.reduce((acc, child) => {
				const renderedChild = this.render(child);
				return {
					css: { ...acc.css, ...renderedChild.css },
					html: Array.isArray(renderedChild.html)
						? [...acc.html, ...flatten(renderedChild.html, Infinity)]
						: [...acc.html, renderedChild.html]
				}
			}, { css: null, html: [] })
			: null;
	}

	renderElement(nodeOrNodes) {
		if (nodeOrNodes && typeof nodeOrNodes.type === 'string') {
			const { children, ...attrs } = nodeOrNodes.props;
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
				const renderedChild = this.render(child);
				return {
					css: { ...acc.css, ...renderedChild.css },
					html: Array.isArray(renderedChild.html)
						? [...acc.html, ...renderedChild.html]
						: [...acc.html, renderedChild.html]
				}
			}, { css: null, html: [] });

			return {
				css: css ? merge(css, renderedChildren.css) : renderedChildren.css,
				html: {
					tagName: nodeOrNodes.type,
					attrs: processObjectEntries(attrs, (key, value) => [replaceAttrFormat(key), value]),
					children: renderedChildren.html
				}
			};
		}

		return null;
	}

	renderFragment(nodeOrNodes, context) {
		if (!nodeOrNodes || nodeOrNodes.type !== Fragment) {
			return null;
		}

		return nodeOrNodes.props.children.reduce((acc, child) => {
			const renderedChild = this.render(child);
			return {
				css: { ...acc.css, ...renderedChild.css },
				html: Array.isArray(renderedChild.html)
					? [...acc.html, ...renderedChild.html]
					: [...acc.html, renderedChild.html]
			};
		}, { css: null, html: [] })
	}

	renderComponent(nodeOrNodes, context) {
		if (!nodeOrNodes || !nodeOrNodes.type || typeof nodeOrNodes.type !== 'function') {
			return null;
		}

		const ctor = nodeOrNodes.type;
		const componentName = ctor.name || 'UnknownComponent';
		const isClass = ctor.prototype && ctor.prototype.isComponent;

		if (DEV && 'propTypes' in ctor) {
			propTypes.checkPropTypes(ctor.propTypes, nodeOrNodes.props, 'prop', componentName);
		}

		const renderedNode = isClass
			? (new ctor(nodeOrNodes.props)).render()
			: ctor(nodeOrNodes.props);

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