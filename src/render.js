import toCss from 'to-css';
// import renderCss from './render-css';
import renderHtml from './render-html';
import renderJsx from './render-jsx';
import transformCssProperty from './transform-css-property';

// import { inspect } from 'util';
// function log(object) {
//     return console.log(inspect(object, {
//         colors: true,
//         depth: Infinity
//     }));
// }

const renderCss = css => toCss(css, {
	indent: '\t',
	property: transformCssProperty,
	value: pixelate
});

const injectCss = (html, css) => {
	const closeHeadRegexp = /(?=<\/head>)/i;
	const hasHead = closeHeadRegexp.test(html);

	if (css) {
		if (hasHead) {
			const styleTag = renderHtml({
				tagName: 'style',
				attrs: {
					type: 'text/css'
				},
				children: [css]
			}, 1);
			return html.replace(closeHeadRegexp, styleTag);
		} else {
			throw new Error('There is no `head` tag in html');
		}
	}

	return html;
};

export default (jsxEl, config = {}) => {
	const { css, html } = renderJsx(jsxEl);

	const htmlString = renderHtml(html);
	const cssString = renderCss(css);

	return injectCss(htmlString, cssString);
};
