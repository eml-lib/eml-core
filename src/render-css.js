import toCss from 'to-css';
import camelToDash from './helpers/string-camel-to-dash';
// import renderStyle from './render-style';

const propsWithPx = new Set([
	'fontSize', 'lineHeight', 'letterSpacing',
	'width', 'minWidth', 'maxWidth',
	'height', 'minHeight', 'maxHeight',
	'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
	'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
	'borderWidth', 'borderBottomWidth', 'borderLeftWidth', 'borderRightWidth', 'borderTopWidth',
	'borderRadius', 'borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomLeftRadius', 'borderBottomRightRadius'
]);

const renderCss = css => toCss(css, {
	indent: '\t',
	property: camelToDash,
	value: value => value
		? propsWithPx.has(value) && typeof value === 'number' && value !== 0
			? value + 'px'
			: value
		: undefined
});

// const renderCss = cssObj => Object.entries(cssObj).map(
// 	([rule, declBlock]) => {
// 		if (rule.startsWith('@')) {
// 			const body = Object.entries(declBlock).map(
// 				([ selector, value ]) => '\t' + selector + ' {\n\t\t' + renderStyle(value) + '\n\t}'
// 			).join('\n');
//
// 			return rule + ' {\n' + body + '\n}';
// 		} else {
// 			return rule + ' {\n\t' + renderStyle(declBlock) + '\n}'
// 		}
// 	}
// ).join('\n');

export default renderCss;
