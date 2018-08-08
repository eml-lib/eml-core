import camelToDash from './helpers/string-camel-to-dash';

const propsWithPx = [
	'width',
	'minWidth',
	'maxWidth',
	'height',
	'minHeight',
	'maxHeight',
	'margin',
	'marginTop',
	'marginRight',
	'marginBottom',
	'marginLeft',
	'padding',
	'paddingTop',
	'paddingRight',
	'paddingBottom',
	'paddingLeft'
];

export default style => (
    Object.entries(style)
        .filter(([prop, value]) => (value !== null && value !== undefined))
        .map(([prop, value]) => {
        	if (propsWithPx.includes(prop) && typeof value === 'number' && value !== 0) {
        		value = value + 'px';
			}

			return camelToDash(prop) + ': ' + value;
		})
        .join('; ')
)