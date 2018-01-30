import xmlParser from './xml-parser';
import createElement from './createElement';

function processTree(root, components = {}) {
    function processNode(node) {
        if (typeof node === 'string') {
            return node;
        }

        if (!(node.name in components)) {
            throw new Error(`No component for ${node.name}`);
        }

        const children = node.children.length !== 0 ? node.children : [node.content];

        return createElement(
            components[node.name],
            node.attributes,
            ...children
        );
    }

    return processNode(root);
}

export default (xml, components) => {
    const tree = xmlParser(xml);

    return processTree(tree.root, components);
};