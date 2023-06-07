import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {DefaultScrollOffset, LoadDirection} from './scroll-with-loading.definition';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Input() scrollOffset = DefaultScrollOffset;
    @Output() loadData = new EventEmitter<LoadDirection>();

    @HostListener('scroll', ['$event.target'])
    private onScroll({clientHeight, scrollTop, scrollHeight}: HTMLElement) {
        const isTopEdgeReached = this.isTopEdgeReached(scrollTop);

        if (isTopEdgeReached) {
            this.notifyEdgeReaching(LoadDirection.UP);
        }

        this.edgeReachedNotifications[LoadDirection.UP] = isTopEdgeReached;

        if (isTopEdgeReached) {
            this.edgeReachedNotifications[LoadDirection.DOWN] = false;

            return;
        }

        const isBottomEdgeReached = this.isBottomEdgeReached(clientHeight, scrollTop, scrollHeight);

        if (isBottomEdgeReached) {
            this.notifyEdgeReaching(LoadDirection.DOWN);
        }

        this.edgeReachedNotifications[LoadDirection.DOWN] = isBottomEdgeReached;
    }

    private edgeReachedNotifications = {
        [LoadDirection.DOWN]: false,
        [LoadDirection.UP]: false,
    };

    private isBottomEdgeReached(
        clientHeight: number,
        scrollTop: number,
        scrollHeight: number,
    ): boolean {
        return clientHeight + scrollTop >= scrollHeight - this.scrollOffset;
    }

    private isTopEdgeReached(scrollTop: number): boolean {
        return scrollTop <= this.scrollOffset;
    }

    private notifyEdgeReaching(direction: LoadDirection): void {
        const isNotified = this.edgeReachedNotifications[direction];

        if (!isNotified) {
            this.loadData.next(direction);
        }
    }
}
