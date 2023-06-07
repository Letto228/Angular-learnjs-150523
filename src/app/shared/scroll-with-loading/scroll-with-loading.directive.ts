import {Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {debounceTime, filter, fromEvent, map, Subscription} from 'rxjs';

export enum LoadDirection {
    UP = 'up',
    DOWN = 'down',
}

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective implements OnInit, OnDestroy {
    @Output() loadData = new EventEmitter<LoadDirection>();
    fromEventSubscription?: Subscription;
    lastScrollTop = 0;
    borderOffset = 100;

    constructor(private readonly elementRef: ElementRef) {}

    ngOnInit(): void {
        this.setupScrollSubscription();
    }

    private monitoringDirection({
        clientHeight,
        scrollHeight,
        scrollTop,
    }: Element): LoadDirection | null {
        const visibleContentHeight = scrollHeight - scrollTop - this.borderOffset;

        const scrollDirection =
            scrollTop > this.lastScrollTop ? LoadDirection.DOWN : LoadDirection.UP;

        this.lastScrollTop = scrollTop;

        if (visibleContentHeight <= clientHeight && scrollDirection !== LoadDirection.UP) {
            return scrollDirection;
        }

        if (scrollTop <= this.borderOffset && scrollDirection !== LoadDirection.DOWN) {
            return scrollDirection;
        }

        return null;
    }

    setupScrollSubscription() {
        this.fromEventSubscription = fromEvent<MouseEvent>(this.elementRef.nativeElement, 'scroll')
            .pipe(
                debounceTime(150),
                map(event => this.monitoringDirection(event.target as Element)),
                filter(direction => Boolean(direction)),
            )
            .subscribe(direction => {
                if (direction) {
                    this.loadData.emit(direction);
                }
            });
    }

    ngOnDestroy(): void {
        this.fromEventSubscription?.unsubscribe();
    }
}
