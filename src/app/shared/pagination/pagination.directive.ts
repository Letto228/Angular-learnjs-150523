import {
    Directive,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import {BehaviorSubject, Subject, map, takeUntil} from 'rxjs';
import {IPaginationContext} from './pagination-context.interface';

@Directive({
    selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnChanges, OnInit, OnDestroy {
    @Input() appPaginationOf: T[] | null | undefined;
    // Количество элементов в чанке
    @Input() appPaginationChankSize = 4;

    private readonly currentIndex$ = new BehaviorSubject<number>(0);
    private readonly destroy$ = new Subject<void>();
    private totalPages = 0;

    constructor(
        private readonly viewContainer: ViewContainerRef,
        private readonly template: TemplateRef<IPaginationContext<T>>,
    ) {}

    ngOnChanges({appPaginationOf}: SimpleChanges) {
        if (appPaginationOf) {
            this.updateView();
        }
    }

    ngOnInit() {
        this.totalPages = this.appPaginationOf
            ? Math.ceil(this.appPaginationOf.length / this.appPaginationChankSize)
            : 0;
        this.listenCurrentIndexChange();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private updateView() {
        const isViewContainerNeedClear = !this.appPaginationOf?.length;

        if (isViewContainerNeedClear) {
            this.viewContainer.clear();

            return;
        }

        this.currentIndex$.next(0);
    }

    private listenCurrentIndexChange() {
        this.currentIndex$
            .pipe(
                map(currentIndex => this.getCurrentContext(currentIndex)),
                takeUntil(this.destroy$),
            )
            .subscribe((context: IPaginationContext<T>) => {
                this.viewContainer.clear();
                this.viewContainer.createEmbeddedView(this.template, context);
            });
    }

    private getCurrentPages(startIndex: number) {
        return (
            this.appPaginationOf?.slice(startIndex, startIndex + this.appPaginationChankSize) || []
        );
    }

    private getCurrentContext(currentIndex: number): IPaginationContext<T> {
        const startIndex = currentIndex * this.appPaginationChankSize;

        return {
            $implicit: this.getCurrentPages(startIndex),
            index: currentIndex,
            appPaginationOf: this.appPaginationOf as T[],
            pages: Array.from(new Array(this.totalPages).keys()),
            next: () => {
                this.next();
            },
            back: this.back.bind(this),
            getPage: index => {
                this.setCurrentPage(index);
            },
        };
    }

    private setCurrentPage(page: number) {
        this.currentIndex$.next(page);
    }

    private next() {
        const nextIndex = this.currentIndex$.value + 1;
        const newIndex = nextIndex < this.totalPages ? nextIndex : 0;

        this.currentIndex$.next(newIndex);
    }

    private back() {
        const previousIndex = this.currentIndex$.value - 1;
        const newIndex = previousIndex >= 0 ? previousIndex : this.totalPages - 1;

        this.currentIndex$.next(newIndex);
    }
}
