import { camelToDashed } from "./utils/string";

export default style => (
    Object.entries(style)
        .filter(([prop, value]) => (value !== null && value !== undefined))
        .map(([prop, value]) => (
            camelToDashed(prop) + ': ' + value
        ))
        .join('; ')
)