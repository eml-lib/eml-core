import renderHtml from './render-html';
import renderJsx from './render-jsx';

// import { inspect } from 'util';
// function log(object) {
//     return console.log(inspect(object, {
//         colors: true,
//         depth: Infinity
//     }));
// }

const wrapWithHtmlString = body => (
`<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;" />
		<style type="text/css">
			{/*renderCss(cssList)*/}
		</style>
	</head>
	${body}
</html>`
);

export default parentJsxEl => {
	return wrapWithHtmlString(
		renderHtml(renderJsx(parentJsxEl))
	);
};