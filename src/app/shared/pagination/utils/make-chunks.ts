export function makeChunks<T>(array: T[], chunkSize: number) {
    const newArray: T[] = [...array];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chunkArrays = [] as T[][];

    for (let i = 0; i < newArray.length; i += chunkSize) {
        chunkArrays.push(newArray.slice(i, i + chunkSize));
    }

    return chunkArrays;
}
