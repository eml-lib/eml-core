import flatten from './helpers/array-flatten';

const reservedProps = {
	context: true
};

export const createElement = (type, props, ...children) => {
	const filteredProps = Object.entries(props)
		.filter(([ name ]) => !reservedProps.hasOwnProperty(name))
		.reduce((acc, [name, value]) => {

		}, {});

	return {
		_isElement: true,
		type,
		props: {
			...props,
			children: children ? flatten(children) : []
		}
	};
};

export const cloneElement = (element, props, ...children) => {
	if (element === null || element === undefined) {
		throw new Error(`React.cloneElement(...): The argument must be a React element, but you passed ${element}`)
	}

	return createElement(element.type, );
};

export const isElement = object => (
	typeof object === 'object'
	&& object !== null
	&& value._isElement === true
);