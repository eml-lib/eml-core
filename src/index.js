import { dashedToCamel } from './utils/string';
import parseXml from '@rgrove/parse-xml';
import createElement from './create-element';
import Fragment from './fragment';
import render from './render';

// import { inspect } from 'util';
// function log(object) {
//     return console.log(inspect(object, {
//         colors: true,
//         depth: Infinity
//     }));
// }

function processTree(root, components = {}) {
    function processNode(node, { rawContext = false } = {}) {
        switch (node.type) {
            case 'element': {
                if (rawContext) {
                    const Component = node.name;
                    const children = 'children' in node
                        ? node.children
                            .filter(node => node.type !== 'text' || node.text.trim() !== '')
                            .map(node => processNode(node, { rawContext: true }))
                        : null;

                    return (
                        <Component {...node.attributes}>
                            { children }
                        </Component>
                    )
                } else {
                    if (node.name === 'raw') {
                        return processNode(node.children[0], { rawContext: true });
                    }

                    if (!(node.name in components)) {
                        throw new Error(`No component for ${node.name}`);
                    }

                    const Component = components[node.name];
                    const attrs = node.attributes ? Object.entries(node.attributes).reduce((acc, [key, value]) => (
                        { ...acc, [dashedToCamel(key)]: value }
                    ), {}) : null;
                    const children = 'children' in node
                        ? node.children
                            .filter(node => node.type !== 'text' || node.text.trim() !== '')
                            .map(processNode)
                        : null;

                    return (
                        <Component {...attrs}>
                            { children }
                        </Component>
                    )
                }
            }

            case 'text': {
                return node.text.trim();
            }

            default: {
                throw new Error(`Unknown node type ${node.type}`);
            }
        }
    }

    return processNode(root);
}

export { createElement, Fragment };

export function parse(xml, { components = {}, options = {} }) {
    const tree = parseXml(xml);

    if (tree) {
        const processedTree = processTree(tree.children[0], components);
        return render(processedTree, options);
    }

    return null;
}