export interface IPaginationContext<T> {
    $implicit: T[];
    index: number;
    pageIndexes: number[];
    appPaginationOf: T[];
    next: () => void;
    back: () => void;
    selectPage: (index: number) => void;
}
