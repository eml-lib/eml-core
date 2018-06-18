export function dashedToCamel(str) {
    return str.replace(/(\-\w)/g, match => match[1].toUpperCase());
}

export function camelToDashed(str) {
    return str.replace(/([A-Z])/g, $1 => '-' + $1.toLowerCase());
}