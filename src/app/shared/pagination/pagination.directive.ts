import {
    Directive,
    Input,
    OnChanges,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import {IPaginationContext} from './pagination-context.interface';

@Directive({
    selector: '[appPagination]',
})

export class PaginationDirective<T> implements OnChanges {
    @Input() appPaginationOf: T[] | undefined | null = [];

    private currentItems: T[] = [];

    private readonly chunkSizes = [4, 8, 12, 16, 20];

    private _chunkSize = 4;

    // Количество элементов в чанке
    @Input() set appPaginationChunkSize(number : 4 | 8 | 12 | 16 | 20 ) {
        this._chunkSize = number;
    }

    private pages: number[] = [];

    private currentPage = 1;

    constructor(
        private readonly viewContainer: ViewContainerRef,
        private readonly template: TemplateRef<IPaginationContext<T>>,
    ) {}

    ngOnChanges() {
        if (!this.appPaginationOf || !this.appPaginationOf?.length) {
            return;
        }

        this.setPages();
        this.setCurrentItems();
    }

    private updateView() {
        if (this.viewContainer.length) {
            this.viewContainer.clear();
        }

        this.viewContainer.createEmbeddedView(this.template, this.getCurrentContext());

    }

    private getCurrentContext(): IPaginationContext<T> {
        return {
            $implicit: this.currentItems,
            chunkSizes: this.chunkSizes,
            currentChunkSize: this._chunkSize,
            setChunkSize: (index: number) => {
                this.setChunkSize(index);
            },
            pages: this.pages,
            currentPage: this.currentPage,
            setPage: (index: number) => {
                this.setPage(index);
            },
        };

    }

    private setPages(): void {

        this.currentPage = 1;
        this.pages = this.getPagesBySize();
    }

    private getPagesBySize(): number[] {

        const pagesCount = Math.ceil(this.appPaginationOf!.length / this._chunkSize);

        let pages : number[] = [];
        if (pagesCount > 1) {
            for (let i = 1; i <= pagesCount; i++) {
                pages.push(i);
            }
        }

        return pages;
    }

    private setCurrentItems(): void {
        this.currentItems = this.appPaginationOf!.slice(
            this._chunkSize * (this.currentPage - 1),
            this._chunkSize * this.currentPage,
        );

        this.updateView();
    }

    setPage(index: number): void {
        if (this.pages.length > 1 && this.pages.length >= index && this.currentPage !== index) {
            this.currentPage = index;
            this.setCurrentItems();
        }
    }

    setChunkSize(chunkSizeIndex: number): void {
        if (
            this.chunkSizes[chunkSizeIndex] &&
            this.chunkSizes[chunkSizeIndex] !== this._chunkSize
        ) {
            this._chunkSize = this.chunkSizes[chunkSizeIndex];
            this.setPages();
            this.setCurrentItems();
        }
    }
}
