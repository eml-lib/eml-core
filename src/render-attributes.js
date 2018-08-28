import renderStyle from './render-style';
import isEmpty from './helpers/object-is-empty';

const ignoredEmptyAttributes = ['style', 'className'];

export default obj => {
	if (!obj) {
		return '';
	}

	return Object.entries(obj)
		.filter(([attr, value]) => !(
			[null, undefined].includes(value)
			|| ignoredEmptyAttributes.includes(attr) && value === '' || (typeof value === 'object' && isEmpty(value))
		))
		.map(([attr, value]) => {
			if (attr === 'className') {
				attr = 'class';
			} else if (attr === 'style') {
				value = renderStyle(value);
			}

			return `${attr}=\"${value}\"`;
		})
		.join(' ')
};