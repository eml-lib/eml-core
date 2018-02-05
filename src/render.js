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

function renderTabs(count) {
    return '\t'.repeat(count);
}

function renderTag(tagName, attributes, content, { beautify = true, depth = 0 }) {
    const attrs = toAttributes(attributes);
    const tagNameWithAttrs = attrs ? tagName + ' ' + attrs : tagName;
    const tab = renderTabs(depth);

    if (emptyElements.includes(tagName)) {
        const tag = `<${tagNameWithAttrs} />`;

        return beautify ? tab + tag + '\n' : tag;
    } else {
        const openingTag = `<${tagNameWithAttrs}>`;
        const closingTag = `</${tagName}>`;

        return beautify
            ? tab + openingTag + '\n' + content + tab + closingTag + '\n'
            : openingTag + content + closingTag;
    }
}

export default (node, options) => {
    const hasOptions = Object.keys(options).length !== 0;
    const styles = [];

    function renderNode(node, depth = 0) {
        // Component
        if (node && node.type && typeof node.type === 'function') {
            return renderNode(hasOptions ? node.type(options).component(node.props) : node.type(node.props), depth);
        }

        if (node === null) {
            return renderTabs(depth) + '' + '\n';
        }

        if (typeof node === 'string' || typeof node === 'number') {
            return renderTabs(depth) + String(node) + '\n';
        }

        const { children, ...attrs } = node.props;
        const childrenHtml = children.map(child => renderNode(child, depth + 1)).join('');

        return renderTag(node.type, attrs, childrenHtml, { depth });
    }

    const rendered = renderNode(node, 2);

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
