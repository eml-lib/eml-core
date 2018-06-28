import flatten from './helpers/array-flatten';
import Fragment from './fragment';

const attrsToLowerCase = ['cellPadding', 'cellSpacing'];

export default function renderJsx(nodeOrNodes) {
	if (nodeOrNodes === null || nodeOrNodes === undefined) {
		return '';
	}

	if (typeof nodeOrNodes === 'string' || typeof nodeOrNodes === 'number') {
		return String(nodeOrNodes);
	}

	if (Array.isArray(nodeOrNodes)) {
		return nodeOrNodes.reduce((acc, child) => {
			const renderedChild = renderJsx(child);
			return Array.isArray(renderedChild)
				? [...acc, ...flatten(renderedChild, Infinity)]
				: [...acc, renderedChild]
		}, []);
	}

	if (!('type' in nodeOrNodes)) {
		throw new Error('Incorrect element type');
	}

	// Fragment
	if (nodeOrNodes.type === Fragment) {
		// return nodeOrNodes.props.children.map(renderJsx);
		return nodeOrNodes.props.children.reduce((acc, child) => {
			const renderedChild = renderJsx(child);

			return Array.isArray(renderedChild)
				? [...acc, ...renderedChild]
				: [...acc, renderedChild]
		}, []);
	}

	// Component
	if (typeof nodeOrNodes.type === 'function') {
		const fn = nodeOrNodes.type;
		const renderedNode = fn(nodeOrNodes.props);

		// if ('css' in fn && !passedComponents.includes(fn)) {
		//     passedComponents.push(fn);
		//     cssList.push(typeof fn.css === 'function' ? fn.css(options) : fn.css);
		// }

		return renderJsx(renderedNode);
	}

	// Element
	const { children, ...attrs } = nodeOrNodes.props;
	const renderedChildren = children.reduce((acc, child) => {
		const renderedChild = renderJsx(child);
		return Array.isArray(renderedChild)
			? [...acc, ...renderedChild]
			: [...acc, renderedChild]
	}, []);

	return {
		tagName: nodeOrNodes.type,
		attrs: Object.entries(attrs).reduce((acc, [ key, value ]) => {
			const attr = attrsToLowerCase.includes(key) ? key.toLowerCase() : key;
			const attrValue = value ? String(value) : null;

			return {
				...acc,
				[attr]: attrValue
			}
		}, {}),
		children: renderedChildren
	};
}