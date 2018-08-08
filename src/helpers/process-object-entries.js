export default (object, processFn) => (
	Object.entries(object).reduce((acc, [ key, value ]) => {
		const [ newKey, newValue ] = processFn(key, value);
		return { ...acc, [newKey]: newValue }
	}, {})
);