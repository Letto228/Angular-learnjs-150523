export interface IPaginationContext<T> {
    $implicit: T[];
    index: number;
    appPaginationOf: T[];
    chunksNum: number[];
    next: () => void;
    back: () => void;
    changePage: (page: string) => void;
}
