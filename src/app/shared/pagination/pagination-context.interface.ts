export interface IPaginationContext<T> {
    $implicit: T[];
    chunkSizes: number[];
    currentChunkSize: number;
    setChunkSize: (index: number) => void;
    pages: number[];
    currentPage: number;
    setPage: (index: number) => void;
}
