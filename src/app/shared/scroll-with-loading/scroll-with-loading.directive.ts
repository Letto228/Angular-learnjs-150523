import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {LoadDirection} from './load-direction';
import {isNeedScrollToTop, isNeedScrollToBottom} from './utils';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Output() loadData = new EventEmitter<LoadDirection>();

    private prevScroll = -1;

    @HostListener('scroll', ['$event.target'])
    onScroll({scrollTop, clientHeight, scrollHeight}: HTMLElement) {
        const prevScroll: number = this.prevScroll;

        this.prevScroll = scrollTop;

        const shouldLoadCardUp = isNeedScrollToTop(scrollTop, prevScroll);

        if (shouldLoadCardUp) {
            this.loadData.emit(LoadDirection.Before);

            return;
        }

        const lowerScrollPosition: number = scrollHeight - clientHeight;
        const shouldLoadCardDown: boolean = isNeedScrollToBottom(
            scrollTop,
            lowerScrollPosition,
            prevScroll,
        );

        if (shouldLoadCardDown) {
            this.loadData.emit(LoadDirection.After);
        }
    }
}
