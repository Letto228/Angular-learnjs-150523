export interface IPaginationContext<T> {
    $implicit: T[] | null | undefined;
    appPaginationOf: T[] | null | undefined;
    chunkSizes: number[];
    currentChunkSize: number;
    setChunkSize: (index: number) => void;
    pages: number[];
    currentPage: number;
    setPage: (index: number) => void;
}
