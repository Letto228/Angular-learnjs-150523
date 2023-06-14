export function filterByProperty<T, K extends keyof T>(
    items: T[],
    propertyName: K,
    searchPropertyValue: T[K],
): T[] {
    if (typeof searchPropertyValue === 'string') {
        const stringPropertyValue = searchPropertyValue.toLowerCase();

        return items.filter(item => {
            const itemPropertyValue = (item[propertyName] as string).toLowerCase();

            return itemPropertyValue.includes(stringPropertyValue);
        });
    }

    return items.filter(item => {
        return item[propertyName] === searchPropertyValue;
    });
}
