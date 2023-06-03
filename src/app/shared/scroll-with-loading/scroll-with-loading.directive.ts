import {Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {debounceTime, fromEvent, map, Subject, Subscription} from 'rxjs';

export enum LoadDirection {
    UP = 'up',
    DOWN = 'down',
}

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective implements OnInit, OnDestroy {
    @Output() loadData = new EventEmitter<LoadDirection | null>();
    scrollSubscription?: Subscription;
    scrollSubject = new Subject<MouseEvent>();
    lastScrollTop = 0;
    borderOffset = 100;

    constructor(private readonly elementRef: ElementRef) {}

    monitoringDirection({target}: MouseEvent) {
        const clientHeight = (target as Element).clientHeight;
        const scrollHeight = (target as Element).scrollHeight;
        const scrollTop = (target as Element).scrollTop;

        this.lastScrollTop = scrollTop;

        if (
            scrollHeight - scrollTop - this.borderOffset <= clientHeight ||
            scrollTop <= this.borderOffset
        ) {
            return this.lastScrollTop > 0 ? LoadDirection.DOWN : LoadDirection.UP;
        }

        return null;
    }

    ngOnInit(): void {
        this.scrollSubscription = this.scrollSubject
            .pipe(
                debounceTime(150),
                map(event => {
                    const direction = this.monitoringDirection(event);

                    if (direction) {
                        return direction;
                    }

                    return null;
                }),
            )
            .subscribe(this.loadData);

        fromEvent<MouseEvent>(this.elementRef.nativeElement, 'scroll').subscribe(
            this.scrollSubject,
        );
    }

    ngOnDestroy(): void {
        this.scrollSubscription?.unsubscribe();
    }
}
