import processObjectEntries from './helpers/process-object-entries';

export default (styles, elId) => {
	const mediaCss = {};
	const inlineStyles = {};

	Object.entries(styles).forEach(([ key, value ]) => {
		const isMediaQuery = key.startsWith('@media');

		if (isMediaQuery) {
			mediaCss[key] = [{
				[`#${elId}`]: processObjectEntries(value, (key, value) => [key, `${value} !important`])
			}];
		} else {
			inlineStyles[key] = value;
		}
	});

	return { mediaCss, inlineStyles };
}