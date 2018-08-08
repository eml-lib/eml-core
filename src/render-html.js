import renderAttributes from './render-attributes';

const defaultEmptyElements = ['meta', 'link', 'hr', 'img', 'br', 'wbr', 'input'];

// const maxInlineTextLength = 100;

export default function renderTag(config, depth = 0) {
	const tab = '\t'.repeat(depth);

	if (Array.isArray(config)) {
		return config.map(configItem => renderTag(configItem, depth)).join('');
	}

	if (typeof config !== 'object') {
		let value;

		if (typeof config === 'string') {
			value = config.split('\n').join('\n' + tab);
		} else {
			value = config;
		}

		return tab + value + '\n';
	}

	const { tagName, attrs, children, emptyElement = false } = config;
	const attrsText = renderAttributes(attrs);
	const tagNameWithAttrs = attrsText ? tagName + ' ' + attrsText : tagName;

	if (defaultEmptyElements.includes(tagName) || emptyElement) {
		const tag = `<${tagNameWithAttrs} />`;
		return tab + tag + '\n';
	} else {
		const openingTag = `<${tagNameWithAttrs}>`;
		const closingTag = `</${tagName}>`;
		const contentHtml = children.map(config => renderTag(config, depth + 1)).join('');

		return tab + openingTag + '\n' + contentHtml + tab + closingTag + '\n';
	}
}