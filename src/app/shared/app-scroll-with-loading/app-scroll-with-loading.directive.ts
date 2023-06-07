import {Directive, OnInit, HostListener, Output, EventEmitter, OnDestroy} from '@angular/core';
import {Subject, debounceTime, takeUntil} from 'rxjs';
import {LoadDirection} from './app-scroll-with-loading.enum';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class AppScrollWithLoadingDirective implements OnInit, OnDestroy {
    @Output() loadData = new EventEmitter<LoadDirection>();
    // private readonly borderOffsetTop$ = new Subject<number>();
    private readonly borderOffsetBottom$ = new Subject<number>();
    private readonly destroy$ = new Subject<void>();

    @HostListener('scroll', ['$event.target'])
    onScroll({scrollTop, scrollHeight, offsetHeight}: HTMLElement) {
        // высота элемента минус видимая часть = невидимая часть
        const invisibleOffset = scrollHeight - offsetHeight;

        // вычисляем, сколько пикс до нижней границы
        const borderOffset = invisibleOffset - scrollTop;

        this.borderOffsetBottom$.next(borderOffset);
        // this.borderOffsetTop$.next(scrollTop);
    }

    ngOnInit() {
        this.initializeListeners();
    }

    initializeListeners(): void {
        // подписка на нижний отступ
        this.borderOffsetBottom$
            .pipe(debounceTime(100), takeUntil(this.destroy$))
            .subscribe((pixels: number) => {
                if (pixels <= 100) {
                    this.loadData.emit(LoadDirection.SCROLLDOWN);
                }
            });

        // подписка на отступ сверху
        // this.borderOffsetTop$
        //     .pipe(debounceTime(100), takeUntil(this.destroy$))
        //     .subscribe((pixels: number) => {
        //         if (pixels <= 100) {
        //             this.loadData.emit(LoadDirection.SCROLLUP);
        //         }
        //     });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
