import flatten from './helpers/array-flatten';

export const createElement = (type, props, ...children) => {
	const newProps = { ...props };

	if (type && type.defaultProps) {
		Object.entries(type.defaultProps).forEach(([name, value]) => {
			if (newProps[name] === undefined) {
				newProps[name] = value;
			}
		});
	}

	return {
		_isElement: true,
		type,
		props: {
			...newProps,
			children: children ? flatten(children) : []
		}
	};
};

// export const cloneElement = (element, props, ...children) => {
// 	if (element === null || element === undefined) {
// 		throw new Error(`React.cloneElement(...): The argument must be a React element, but you passed ${element}`);
// 	}
//
// 	return createElement(element.type, );
// };

export const isElement = object => (
	typeof object === 'object'
	&& object !== null
	&& object._isElement === true
);
