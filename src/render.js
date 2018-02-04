import { wrapArray } from './utils/array';

function toAttributes(obj) {
    if (!obj) {
        return '';
    }

    return Object.keys(obj)
        .filter(key => obj[key])
        .map(key => {
            let attrName = key;

            if (key === 'className') {
                attrName = 'class';
            }

            return `${ attrName }="${ obj[key] }"`;
        })
        .join(' ')
}

// const emptyConfig = {
//     style: null,
//     el: null
// };
//
// function renderNull(node) {
//     if (node !== null) {
//         return null;
//     }
//
//     return {
//         ...emptyConfig,
//         el: ''
//     };
// }
//
// function renderText(node) {
//     if (!['string', 'number'].includes(typeof node)) {
//         return null;
//     }
//
//     return {
//         ...emptyConfig,
//         el: String(node)
//     }
// }
//
// function renderComponent(node) {
//     if (typeof node.type !== 'function') {
//         return null;
//     }
//
//     const children = node.type(node.props);
//     let html = '';
//     let styles = [];
//
//     (Array.isArray(children) ? children : [children]).forEach(child => {
//         const isConfig = typeof child === 'object' && !child._isElement;
//         let el;
//
//         if (isConfig) {
//             if (child.style) {
//                 styles.push(child.style);
//             }
//             el = child.el;
//         } else {
//             el = child;
//         }
//
//         html += render(el);
//     });
//
//     return {
//         ...emptyConfig,
//         style: styles.length !== 0 ? styles.join(' ') : null,
//         el: html
//     };
// }

const emptyElements = ['hr', 'img', 'br', 'link', 'meta', 'wbr', 'input'];

function createTag(tagName, attributes, content) {
    const attr = toAttributes(attributes);
    const attrHtml = attr ? ' ' + attr : '';

    return emptyElements.includes(tagName)
        ? `<${tagName + attrHtml} />`
        : `<${tagName + attrHtml}>${content}</${tagName}>`;
}

export default (node, beautify) => {
    const styles = [];

    console.log(node);

    function render(node) {
        if (node === null) {
            return '';
        }

        if (typeof node === 'string' || typeof node === 'number') {
            return String(node);
        }

        if (typeof node.type === 'function') {
            const children = node.type(node.props);
            let html = '';

            wrapArray(children).forEach(child => {
                const isConfig = typeof child === 'object' && !child._isElement;
                let el;

                if (isConfig) {
                    if (child.style) {
                        styles.push(child.style);
                    }
                    el = child.el;
                } else {
                    el = child;
                }

                html += render(el);
            });

            return html;
        }

        const { children, ...attrs } = node.props;
        const childrenHtml = children.map(render).join('');

        return createTag(node.type, attrs, childrenHtml);
    }

    const rendered = render(node);

    return (
`<!DOCTYPE html>
<html>
    <head>
        <style type="text/css">
            ${ styles.join(' ') }
        </style>
    </head>
    <body>
        ${ rendered }
    </body>
</html>`
    );
};