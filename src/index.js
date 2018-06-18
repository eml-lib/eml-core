// import warning from 'warning';
import flatten from './helpers/array-flatten';
import Fragment from './fragment';
import renderCss from './render-css';
import renderHtml from './render-html';

function createNode(tagName, attrs = null, children = []) {
    return { tagName, attrs, children };
}

console.log(2);

export default (parentJsxEl) => {
    // const passedComponents = [];
    // const cssList = [];

    function renderJsx(nodeOrNodes) {
        if (nodeOrNodes === null || nodeOrNodes === undefined) {
            return '';
        }

        if (typeof nodeOrNodes === 'string' || typeof nodeOrNodes === 'number') {
            return String(nodeOrNodes);
        }

        if (nodeOrNodes.type === Fragment) {
            return nodeOrNodes.props.children.reduce((acc, child) => {
                console.log(child);
                return renderJsx(child);
            }, []);
        }

        // Component
        if (typeof nodeOrNodes.type === 'function') {
            const fn = nodeOrNodes.type;
            const renderedNode = fn(nodeOrNodes.props);

            // if ('css' in fn && !passedComponents.includes(fn)) {
            //     passedComponents.push(fn);
            //     cssList.push(typeof fn.css === 'function' ? fn.css(options) : fn.css);
            // }

            return renderJsx(renderedNode);
        }

        const { children, ...attrs } = nodeOrNodes.props;
        const renderedChildren = children.reduce((acc, child) => {
            const renderedChild = renderJsx(child);

            return Array.isArray(renderedChild)
                ? [...acc, ...flatten(renderedChild, Infinity)]
                : [...acc, renderedChild]
        }, []);

        return {
            tagName: nodeOrNodes.type,
            attrs,
            children: renderedChildren
        };
    }

    const content = renderJsx(parentJsxEl);

    // return `
    // 	<html
    // 		xmlns="http://www.w3.org/1999/xhtml"
    // 		xmlns:v="urn:schemas-microsoft-com:vml"
    // 		xmlns:o="urn:schemas-microsoft-com:office:office">
    // 		<head>
    // 			<meta charset="UTF-8" />
    // 			<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    // 			<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;" />
    // 			<style>
    //
    // 		</style>
    // 	</head>
    // 	{ content }
    // 	</html>
    // `;

    return renderHtml(
        createNode('html', {
            'xmlns':    'http://www.w3.org/1999/xhtml',
            'xmlns:v':  'urn:schemas-microsoft-com:vml',
            'xmlns:o':  'urn:schemas-microsoft-com:office:office'
        }, [
            createNode('head', null, [
                createNode('meta', { charset: 'utf-8' }),
                createNode('meta', { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' }),
                createNode('meta', { name: 'viewport', content: 'width=device-width; initial-scale=1.0; maximum-scale=1.0;' }),
                createNode('style', { type: 'text/css' }, [
                    // renderCss(cssList)
                ])
            ]),
            content
        ])
    );
};