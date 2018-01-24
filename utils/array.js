export function flatten(arr) {
    return arr.reduce((a, b) => a.concat(b), []);
}

export function wrapArray(arrayOrAny) {
    return Array.isArray(arrayOrAny) ? arrayOrAny : [arrayOrAny];
}