import { dashedToCamel } from './utils/string';
import xmlParser from 'xml-js';
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

                    return (
                        <Component {...node.attributes}>
                            { 'elements' in node ? node.elements.map(node => processNode(node, { rawContext: true })) : null }
                        </Component>
                    )
                } else {
                    if (node.name === 'raw') {
                        return processNode(node.elements[0], { rawContext: true });
                    }

                    if (!(node.name in components)) {
                        throw new Error(`No component for ${node.name}`);
                    }

                    const Component = components[node.name];
                    const attrs = node.attributes ? Object.entries(node.attributes).reduce((acc, [key, value]) => (
                        { ...acc, [dashedToCamel(key)]: value }
                    ), {}) : null;

                    return (
                        <Component {...attrs}>
                            { 'elements' in node ? node.elements.map(processNode) : null }
                        </Component>
                    )
                }
            }

            case 'text': {
                return node.text;
            }

            case 'cdata': {
                return node.cdata;
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
    const tree = xmlParser.xml2js(xml);

    return tree ? render(processTree(tree.elements[0], components), options) : null;
}