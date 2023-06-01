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
import {ICarouselContext} from './carousel-context.interface';

@Directive({
    selector: '[appCarousel]',
})
export class CarouselDirective<T> implements OnChanges, OnInit, OnDestroy {
    @Input() appCarouselOf: T[] | null | undefined;

    private readonly currentIndex$ = new BehaviorSubject<number>(0);
    private readonly destroy$ = new Subject<void>();

    constructor(
        private readonly viewContainer: ViewContainerRef,
        private readonly template: TemplateRef<ICarouselContext<T>>,
    ) {}

    ngOnChanges({appCarouselOf}: SimpleChanges) {
        if (appCarouselOf) {
            this.updateView();
        }
    }

    ngOnInit() {
        this.listenCurrentIndexChange();
    }

    ngOnDestroy() {
        // this.subscription.unsubscribe();
        this.destroy$.next();
        this.destroy$.complete();
    }

    private updateView() {
        const isViewContainerNeedClear = !this.appCarouselOf?.length;

        if (isViewContainerNeedClear) {
            this.viewContainer.clear();

            return;
        }

        this.currentIndex$.next(0);
    }

    // subscription!: Subscription;

    private listenCurrentIndexChange() {
        // this.subscription = this.currentIndex$
        this.currentIndex$
            .pipe(
                map(currentIndex => this.getCurrentContext(currentIndex)),
                // filter(Boolean), // filter(value => Boolean(value))
                takeUntil(this.destroy$),
            )
            .subscribe((context: ICarouselContext<T>) => {
                this.viewContainer.clear();
                this.viewContainer.createEmbeddedView(this.template, context);
            });
    }

    private getCurrentContext(currentIndex: number): ICarouselContext<T> {
        // if (!this.appCarouselOf?.length) {
        //     return null;
        // }

        return {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $implicit: this.appCarouselOf![currentIndex],
            index: currentIndex,
            appCarouselOf: this.appCarouselOf as T[],
            next: () => {
                this.next();
            },
            back: this.back.bind(this),
        };
    }

    private next() {
        const nextIndex = this.currentIndex$.value + 1;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const newIndex = nextIndex < this.appCarouselOf!.length ? nextIndex : 0;

        this.currentIndex$.next(newIndex);
    }

    private back() {
        const previousIndex = this.currentIndex$.value - 1;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const newIndex = previousIndex >= 0 ? previousIndex : this.appCarouselOf!.length - 1;

        this.currentIndex$.next(newIndex);
    }
}
