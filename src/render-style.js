import { camelToDashed } from "./utils/string";

export default style => (
    Object.entries(style).map(([prop, value]) => (
        camelToDashed(prop) + ': ' + value
    )).join('; ')
)