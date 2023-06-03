import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {LoadDirection} from './load-direction';
import {borderOffset} from './border-offset';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Output() loadData = new EventEmitter<LoadDirection>();

    private prevScroll = -1;

    private needScrollToTop(scrollTop: number, prevScroll: number): boolean {
        return scrollTop < borderOffset && scrollTop < prevScroll;
    }

    private needScrollToBottom(
        scrollTop: number,
        lowerScrollPosition: number,
        prevScroll: number,
    ): boolean {
        return lowerScrollPosition - scrollTop < borderOffset && scrollTop > prevScroll;
    }

    @HostListener('scroll', ['$event.target'])
    onScroll({scrollTop, clientHeight, scrollHeight}: HTMLElement) {
        const prevScroll: number = this.prevScroll;

        this.prevScroll = scrollTop;

        const shouldLoadCardUp = this.needScrollToTop(scrollTop, prevScroll);

        if (shouldLoadCardUp) {
            this.loadData.emit(LoadDirection.Before);
        }

        const lowerScrollPosition: number = scrollHeight - clientHeight;
        const shouldLoadCardDown: boolean = this.needScrollToBottom(
            scrollTop,
            lowerScrollPosition,
            prevScroll,
        );

        if (shouldLoadCardDown) {
            this.loadData.emit(LoadDirection.After);
        }
    }
}
