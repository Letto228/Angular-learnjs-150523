import {
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import {debounceTime, filter, fromEvent, map, Subject, Subscription} from 'rxjs';

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
    private timerId!: number;

    constructor(private readonly elementRef: ElementRef) {}

    monitoringDirection({target}: MouseEvent) {
        const clientHeight = (target as Element).clientHeight;
        const scrollHeight = (target as Element).scrollHeight;
        const scrollTop = (target as Element).scrollTop;

        const scrollDirection =
            scrollTop - this.lastScrollTop > 0 ? LoadDirection.DOWN : LoadDirection.UP;

        this.lastScrollTop = scrollTop;

        if (
            scrollHeight - scrollTop - this.borderOffset <= clientHeight &&
            scrollDirection !== LoadDirection.UP
        ) {
            return scrollDirection;
        }

        if (scrollTop <= this.borderOffset && scrollDirection !== LoadDirection.DOWN) {
            return scrollDirection;
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
                filter(direction => {
                    return Boolean(direction);
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

    // **************************************************//
    // Чтобы его включить нужно снять коминтарии c 93 и 97 строк.
    // И закоментировать строки 64 - 66.
    // Этот вариант вариант сделал изначально.
    @HostListener('scroll', ['$event'])
    onScroll({target}: MouseEvent) {
        const clientHeight = (target as Element).clientHeight;
        const scrollHeight = (target as Element).scrollHeight;
        const scrollTop = (target as Element).scrollTop;

        const scrollDirection =
            scrollTop - this.lastScrollTop > 0 ? LoadDirection.DOWN : LoadDirection.UP;

        this.lastScrollTop = scrollTop;

        clearTimeout(this.timerId);

        this.timerId = setTimeout(() => {
            if (
                scrollHeight - scrollTop - this.borderOffset <= clientHeight &&
                scrollDirection === 'down'
            ) {
                // this.loadData.emit(scrollDirection);
            }

            if (scrollTop <= this.borderOffset && scrollDirection === 'up') {
                //     this.loadData.emit(scrollDirection);
            }
        }, 150);
    }
}
