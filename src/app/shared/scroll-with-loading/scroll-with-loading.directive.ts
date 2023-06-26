import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {LoadDirection} from './load-direction.enum';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    private readonly maxBorderOffset: number = 100;
    private prevScrollTopValue = 0;

    @HostListener('scroll', [
        '$event.target.clientHeight',
        '$event.target.scrollHeight',
        '$event.target.scrollTop',
    ])
    checkCurrentBorderOffset(clientHeight: number, scrollHeight: number, scrollTop: number): void {
        const isScrollingDown = this.isScrollingDown(scrollTop);

        this.prevScrollTopValue = scrollTop;

        if (!isScrollingDown && scrollTop <= this.maxBorderOffset) {
            this.loadData.emit(LoadDirection.Top);

            return;
        }

        const scrollBottom = scrollHeight - clientHeight - scrollTop;

        if (isScrollingDown && scrollBottom <= this.maxBorderOffset) {
            this.loadData.emit(LoadDirection.Bottom);
        }
    }

    @Output() loadData: EventEmitter<LoadDirection> = new EventEmitter<LoadDirection>();

    private isScrollingDown(scrollTop: number): boolean {
        return this.prevScrollTopValue < scrollTop;
    }
}
