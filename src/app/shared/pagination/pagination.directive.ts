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
import {makeChunks} from './utils/make-chunks';

@Directive({
    selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnChanges, OnInit, OnDestroy {
    @Input() appPaginationOf: T[] | null | undefined;
    // Количество элементов в чанке
    @Input() appPaginationChankSize = 4;

    private readonly currentIndex$ = new BehaviorSubject<number>(0);
    private readonly destroy$ = new Subject<void>();
    private chunkedArrays: T[][] = [];

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
        this.initializeListeners();
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

        // делим исходный массив на чанки
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.chunkedArrays = makeChunks(this.appPaginationOf!, this.appPaginationChankSize);

        // устанавливаем index = 0
        this.currentIndex$.next(0);
    }

    private initializeListeners() {
        this.currentIndex$
            .pipe(
                map(currentIndex => this.getCurrentContext(currentIndex, this.chunkedArrays)),
                takeUntil(this.destroy$),
            )
            .subscribe((context: IPaginationContext<T>) => {
                this.viewContainer.clear();
                this.viewContainer.createEmbeddedView(this.template, context);
            });
    }

    // private makeChunks(array: T[], chunkSize: number) {
    //     const newArray: T[] = [...array];
    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     const chunkArrays = [] as T[][];

    //     for (let i = 0; i < newArray.length; i += chunkSize) {
    //         chunkArrays.push(newArray.slice(i, i + chunkSize));
    //     }

    //     return chunkArrays;
    // }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private getCurrentContext(currentIndex: number, chunkArrays: T[][]): IPaginationContext<T> {
        const chunksNum = [...new Array(chunkArrays.length).keys()].map(i => Number(i));

        return {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $implicit: chunkArrays[currentIndex],
            index: currentIndex,
            appPaginationOf: this.appPaginationOf as T[],
            chunksNum,
            next: () => {
                this.next();
            },
            back: this.back.bind(this),
            changePage: this.changePage.bind(this),
        };
    }

    private next() {
        const nextIndex = this.currentIndex$.value + 1;
        const currentChunk = this.chunkedArrays[this.currentIndex$.value] as T[];
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const newIndex = nextIndex < currentChunk.length ? nextIndex : 0;

        this.currentIndex$.next(newIndex);
    }

    private back() {
        const previousIndex = this.currentIndex$.value - 1;
        const currentChunk = this.chunkedArrays[this.currentIndex$.value] as T[];
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const newIndex = previousIndex >= 0 ? previousIndex : currentChunk.length - 2;

        this.currentIndex$.next(newIndex);
    }

    private changePage(page: number) {
        this.currentIndex$.next(page);
    }
}
