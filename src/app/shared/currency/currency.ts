export function currency(
    price: number | null | undefined,
    code: string,
    separator: string = ' ',
): string {
    return `${price}${separator}${code}`;
}
