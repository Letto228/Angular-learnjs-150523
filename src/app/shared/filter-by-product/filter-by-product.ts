export function filterProduct(value: number | undefined | null, separator: string = '_') {
    return `${value} ${separator}`;
}
