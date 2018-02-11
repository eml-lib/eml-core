import warning from 'warning';
import renderCss from './render-css';
import renderHtml from './render-html';

function createHtmlElConfig(tagName, attrs = null, children = []) {
    return { tagName, attrs, children };
}

export default (parentJsxEl, options) => {
    const passedComponents = [];
    const cssList = [];

    function renderJsxEl(node) {
        // Component
        if (node && node.type && typeof node.type === 'function') {
            const fn = node.type;
            const renderedNode = fn(node.props, options);

            if ('css' in fn && !passedComponents.includes(fn)) {
                passedComponents.push(fn);
                cssList.push(typeof fn.css === 'function' ? fn.css(options) : fn.css);
            }

            return renderJsxEl(renderedNode);
        }

        if (typeof node === 'string' || typeof node === 'number') {
            return String(node);
        }

        if (node === null || node === undefined) {
            return '';
        }

        const { children, ...attrs } = node.props;

        return createHtmlElConfig(node.type, attrs, children.map(renderJsxEl));
    }

    warning(false, 'asdf asdfasdf asdf');

    const content = renderJsxEl(parentJsxEl);

    return renderHtml(
        createHtmlElConfig('html', null, [
            createHtmlElConfig('head', null, [
                createHtmlElConfig('style', { type: 'text/css' }, [
                    renderCss(cssList)
                ])
            ]),
            createHtmlElConfig('body', null, [
                content
            ]),
        ])
    );
};