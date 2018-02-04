import xmlParser from './xml-parser';
import createElement from './create-element';
import render from './render';

function processTree(root, components = {}) {
    function processNode(node) {
        if (typeof node === 'string') {
            return node.trim();
        }

        if (!(node.name in components)) {
            throw new Error(`No component for ${node.name}`);
        }

        const children = node.children.length !== 0 ? node.children : [node.content];

        return createElement(
            components[node.name],
            node.attributes,
            ...children.map(processNode)
        );
    }

    return processNode(root);
}

export { createElement };

export function parse(xml, { components, ...options }) {
    const tree = xmlParser(xml);

    return tree.root ? render(processTree(tree.root, components), options) : null;
}