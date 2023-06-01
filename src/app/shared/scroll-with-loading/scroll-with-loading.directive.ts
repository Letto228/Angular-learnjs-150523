import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {LoadDirection} from './load-direction.const';
import {isScrollReachedBottomOffcet} from './utils/is-scroll-reached-bottom-offcet';
import {isScrollReachedTopOffcet} from './utils/is-scroll-reached-top-offcet';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Output() loadData = new EventEmitter<LoadDirection>();

    private prevScrollTop = -1;

    @HostListener('scroll', ['$event.target'])
    onScroll({scrollTop, clientHeight, scrollHeight}: HTMLElement) {
        const prevScrollTop = this.prevScrollTop;

        this.prevScrollTop = scrollTop;

        const lowerScrollPosition = scrollHeight - clientHeight;
        const shouldLoadMessagesDown = isScrollReachedBottomOffcet(
            scrollTop,
            lowerScrollPosition,
            prevScrollTop,
        );

        if (shouldLoadMessagesDown) {
            this.loadData.emit(LoadDirection.After);

            return;
        }

        const shouldLoadMessagesTop = isScrollReachedTopOffcet(scrollTop, prevScrollTop);

        if (shouldLoadMessagesTop) {
            this.loadData.emit(LoadDirection.Before);
        }
    }
}
