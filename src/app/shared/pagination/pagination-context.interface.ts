export interface IPaginationContext<T> {
    $implicit: T[];
    appPaginationOf: T[];
    currentPageIndex: number;
    pageIndexes: number[];
    goToNextPage: () => void;
    goToPrevPage: () => void;
    goToPage: (pageIndex: number) => void;
    isCurrentPage: (pageIndex: number) => boolean;
}
