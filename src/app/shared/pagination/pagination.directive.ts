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
import {getGroupedItems} from './utils/get-grouped-items';

@Directive({
    selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnChanges, OnInit, OnDestroy {
    @Input() appPaginationOf: T[] | null | undefined;
    @Input() appPaginationChankSize = 4;

    private readonly currentIndex$ = new BehaviorSubject<number>(0);
    private readonly destroy$ = new Subject<void>();

    groupedItems: T[][] = [];

    constructor(
        private readonly viewContainer: ViewContainerRef,
        private readonly template: TemplateRef<IPaginationContext<T>>,
    ) {}

    ngOnChanges({appPaginationOf, appPaginationChankSize}: SimpleChanges) {
        if (appPaginationOf || appPaginationChankSize) {
            this.updateView();
        }
    }

    ngOnInit() {
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

        this.groupedItems = getGroupedItems(
            this.appPaginationOf as T[],
            this.appPaginationChankSize,
        );
        this.currentIndex$.next(0);
    }

    private listenCurrentIndexChange() {
        this.currentIndex$
            .pipe(
                map(currentIndex => this.getCurrentContext(currentIndex)),
                takeUntil(this.destroy$),
            )
            .subscribe((context: IPaginationContext<T>) => {
                // console.log(context, 'created context');
                this.viewContainer.clear();
                this.viewContainer.createEmbeddedView(this.template, context);
            });
    }

    private getCurrentContext(currentIndex: number): IPaginationContext<T> {
        return {
            $implicit: this.groupedItems[currentIndex],
            currentPageIndex: currentIndex,
            appPaginationOf: this.groupedItems[currentIndex] as T[],
            pageIndexes: this.getPageIndexes(),
            goToNextPage: () => {
                this.goToNextPage();
            },
            goToPrevPage: () => {
                this.goToNexPrevPage();
            },
            goToPage: (pageIndex: number) => this.goToPage(pageIndex),
            isCurrentPage: (pageIndex: number) => this.isCurrentPage(pageIndex, currentIndex),
        };
    }

    private getPageIndexes(): number[] {
        return this.groupedItems.map((_, index) => index);
    }

    private goToNextPage(): void {
        const nextIndex = this.currentIndex$.value + 1;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const newIndex = nextIndex < this.appPaginationOf!.length ? nextIndex : 0;

        this.currentIndex$.next(newIndex);
    }

    private goToNexPrevPage(): void {
        const previousIndex = this.currentIndex$.value - 1;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const newIndex = previousIndex >= 0 ? previousIndex : this.appPaginationOf!.length - 1;

        this.currentIndex$.next(newIndex);
    }

    private goToPage(pageIndex: number): void {
        this.currentIndex$.next(pageIndex);
    }

    private isCurrentPage(pageIndex: number, currentIndex: number): boolean {
        return pageIndex === currentIndex;
    }
}
