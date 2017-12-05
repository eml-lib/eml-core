const fs = require('fs');
const { inspect } = require('util');
const { createElement, parse, render } = require('./build');

function log(object) {
    return console.log(inspect(object, {
        colors: true,
        depth: Infinity
    }));
}

const xml = fs.readFileSync('./data.xml', 'utf8');

const parsed = parse(xml, {
    // wrapper: props => createElement('div', { className: 2 }, ...props.children),
    block: props => createElement('span', {}, ...props.children),
});

log(parsed);
console.log(render(parsed));