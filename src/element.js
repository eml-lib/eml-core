import flatten from './helpers/array-flatten';

const reservedProps = {
	context: true
};

export const createElement = (type, props, ...children) => {
	const filteredProps = {};

	if (props) {
		Object.entries(props).forEach(([name, value]) => {
			if (!reservedProps.hasOwnProperty(name)) {
				filteredProps[name] = value;
			}
		});
	}

	if (type && type.defaultProps) {
		Object.entries(type.defaultProps).forEach(([name, value]) => {
			if (filteredProps[name] === undefined) {
				filteredProps[name] = value;
			}
		});
	}

	return {
		_isElement: true,
		type,
		props: {
			...filteredProps,
			children: children ? flatten(children) : []
		}
	};
};

export const cloneElement = (element, props, ...children) => {
	if (element === null || element === undefined) {
		throw new Error(`React.cloneElement(...): The argument must be a React element, but you passed ${element}`);
	}

	return createElement(element.type, );
};

export const isElement = object => (
	typeof object === 'object'
	&& object !== null
	&& object._isElement === true
);