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

    private chanks: T[][] = [];
    private pageIndexes: number[] = [];

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

        this.chanks = this.getChanks(this.appPaginationOf!, this.appPaginationChankSize);
        this.pageIndexes = this.chanks.map((_, index) => index);

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

    private getCurrentContext(currentIndex: number): IPaginationContext<T> {
        return {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $implicit: this.chanks[currentIndex],
            index: currentIndex,
            pageIndexes: this.pageIndexes,
            appPaginationOf: this.appPaginationOf as T[],
            next: () => {
                this.next();
            },
            back: () => {
                this.back();
            },
            selectPage: (index: number) => {
                this.selectPage(index);
            },
        };
    }

    private next() {
        const nextIndex = this.currentIndex$.value + 1;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const newIndex = nextIndex < this.chanks!.length ? nextIndex : 0;

        this.currentIndex$.next(newIndex);
    }

    private back() {
        const previousIndex = this.currentIndex$.value - 1;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const newIndex = previousIndex >= 0 ? previousIndex : this.chanks!.length - 1;

        this.currentIndex$.next(newIndex);
    }

    private getChanks(items: T[], chankSize: number) {
        const chankIndexes = Math.ceil(items.length / chankSize);

        return Array.from(new Array(chankIndexes)).map((_, index) => {
            const startIndex = index * chankSize;
            const endIndex = startIndex + chankSize;

            return items.slice(startIndex, endIndex);
        });
    }

    private selectPage(index: number): void {
        if (this.currentIndex$.value === index || index >= this.chanks.length) {
            return;
        }

        this.currentIndex$.next(index);
    }
}
