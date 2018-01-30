export function snakeToCamel(str) {
    return str.replace(/(\-\w)/g, match => match[1].toUpperCase());
}