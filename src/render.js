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

const emptyElements = ['hr', 'img', 'br', 'link', 'meta', 'wbr', 'input'];

function createTag(tagName, attributes, content, { beautify, depth }) {
    const attr = toAttributes(attributes);
    const attrHtml = attr ? ' ' + attr : '';

    return '\t'.repeat(depth) + (emptyElements.includes(tagName)
        ? `<${tagName + attrHtml} />\n`
        : `<${tagName + attrHtml}>\n${content}${ '\t'.repeat(depth) }</${tagName}>\n`);
}

export default (node, options) => {
    const styles = [];

    function render(node, depth = 0) {
        // Component
        if (node && node.type && typeof node.type === 'function') {
            node = node.type({ ...node.props, ...options });
        }

        if (node === null) {
            return '\t'.repeat(depth) + '' + '\n';
        }

        if (typeof node === 'string' || typeof node === 'number') {
            return '\t'.repeat(depth) + String(node) + '\n';
        }

        const { children, ...attrs } = node.props;
        const childrenHtml = children.map(child => render(child, depth + 1)).join('');

        return createTag(node.type, attrs, childrenHtml, { depth });
    }

    return (
`<!DOCTYPE html>
<html>
    <head>
        <style type="text/css">
${ styles.join(' ') }
        </style>
    </head>
    <body>
${ render(node, 2) }
    </body>
</html>`
    );
};