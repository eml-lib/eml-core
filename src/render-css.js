import renderStyle from './render-style';

const renderCss = cssObj => Object.entries(cssObj).map(
	([rule, declBlock]) => {
		if (rule.startsWith('@')) {
			const body = Object.entries(declBlock).map(
				([ selector, value ]) => '\t' + selector + ' {\n\t\t' + renderStyle(value) + '\n\t}'
			).join('\n');

			return rule + ' {\n' + body + '\n}';
		} else {
			return rule + ' {\n\t' + renderStyle(declBlock) + '\n}'
		}
	}
).join('\n');

export default renderCss;