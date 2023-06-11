import {
    ChangeDetectorRef,
    Directive,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import {IPaginationContext} from './pagination-context.interface';

@Directive({
    selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnChanges, OnInit {
    @Input() appPaginationOf: T[] | undefined | null = [];

    private currentItems: T[] = [];

    readonly chunkSizes: number[] = [4, 8, 12, 16, 20];

    // Количество элементов в чанке
    @Input() appPaginationChunkSize: number = this.chunkSizes[0];

    pages: number[] = [];

    currentPage = 1;

    constructor(
        private readonly viewContainer: ViewContainerRef,
        private readonly template: TemplateRef<IPaginationContext<T>>,
        private readonly changeDetectorRef: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        this.viewContainer.createEmbeddedView(this.template, this.getCurrentContext());
        this.changeDetectorRef.markForCheck();
    }

    ngOnChanges({appPaginationOf, appPaginationChunkSize}: SimpleChanges) {
        if (appPaginationOf || appPaginationChunkSize) {
            this.setPages();
            this.setCurrentItems();
        }
    }

    private updateView() {
        if (this.viewContainer.length) {
            this.viewContainer.clear();
        }

        this.viewContainer.createEmbeddedView(this.template, this.getCurrentContext());

        this.changeDetectorRef.markForCheck();
    }

    private getCurrentContext(): IPaginationContext<T> {
        return {
            $implicit: this.currentItems,
            appPaginationOf: this.currentItems,
            chunkSizes: this.chunkSizes,
            currentChunkSize: this.appPaginationChunkSize,
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
        if (!this.appPaginationOf || !this.appPaginationOf?.length) {
            return;
        }

        this.currentPage = 1;
        const pagesCount = Math.ceil(this.appPaginationOf!.length / this.appPaginationChunkSize);

        this.pages = [];

        if (pagesCount > 1) {
            for (let i = 1; i <= pagesCount; i++) {
                this.pages.push(i);
            }
        }
    }

    private setCurrentItems(): void {
        if (!this.appPaginationOf || !this.appPaginationOf?.length) {
            return;
        }

        this.currentItems = this.appPaginationOf.slice(
            this.appPaginationChunkSize * (this.currentPage - 1),
            this.appPaginationChunkSize * this.currentPage,
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
            this.chunkSizes[chunkSizeIndex] !== this.appPaginationChunkSize
        ) {
            this.appPaginationChunkSize = this.chunkSizes[chunkSizeIndex];
            this.setPages();
            this.setCurrentItems();
        }
    }
}
