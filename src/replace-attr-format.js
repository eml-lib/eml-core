import camelToDash from './helpers/string-camel-to-dash';

const toLowerCase = [
	'charSet',
	'cellPadding',
	'cellSpacing',
	'colSpan',
	'rowSpan'
];

const toDash = [
	'httpEquiv'
];

export default attr => {
	if (toLowerCase.includes(attr)) {
		return attr.toLowerCase();
	} else if (toDash.includes(attr)) {
		return camelToDash(attr);
	} else {
		return attr;
	}
}