import renderCss from './render-css';
import renderHtml from './render-html';
import renderJsx from './render-jsx';

// import { inspect } from 'util';
// function log(object) {
//     return console.log(inspect(object, {
//         colors: true,
//         depth: Infinity
//     }));
// }

const injectCss = (html, css) => {
	const regexp = /(?=<\/head>)/i;
	const hasHead = regexp.test(html);

	if (css) {
		if (hasHead) {
			const cssString = renderCss(css);
			const styleTag = renderHtml({
				tagName: 'style',
				attrs: {
					type: 'text/css'
				},
				children: [cssString]
			}, 1);
			return html.replace(regexp, styleTag);
		} else {
			throw new Error('There is no `head` tag in html');
		}
	}

	return html;
};

export default (jsxEl, config = {}) => {
	const { css, html } = renderJsx(jsxEl);
	const renderedHtml = renderHtml(html);

	return injectCss(renderedHtml, css);
};
