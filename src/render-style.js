import camelToDash from './helpers/string-camel-to-dash';

export default style => (
    Object.entries(style)
        .filter(([prop, value]) => (value !== null && value !== undefined))
        .map(([prop, value]) => (
			camelToDash(prop) + ': ' + value
        ))
        .join('; ')
)