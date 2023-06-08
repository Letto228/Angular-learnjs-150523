import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {LoadDirection} from './load-direction.type';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Output()
    loadData = new EventEmitter<LoadDirection>();

    // eslint-disable-next-line @typescript-eslint/naming-convention
    private readonly BORDER_OFFSET_X = 100;
    private prevPosition = 0;

    @HostListener('scroll', [
        '$event.target.scrollTop',
        '$event.target.clientHeight',
        '$event.target.scrollHeight',
    ])
    onScroll(scrollTop: number, clientHeight: number, scrollHeight: number) {
        const tmpPrevPosition = this.prevPosition;

        this.prevPosition = scrollTop;

        const isLoadCardDown = scrollTop > this.BORDER_OFFSET_X && scrollTop > tmpPrevPosition;

        if (isLoadCardDown) {
            this.loadData.emit(LoadDirection.Down);

            return;
        }

        const scrollBottom = scrollHeight - clientHeight;
        const isLoadCardUp =
            scrollTop < scrollBottom - this.BORDER_OFFSET_X && scrollTop < tmpPrevPosition;

        if (isLoadCardUp) {
            this.loadData.emit(LoadDirection.Up);
        }
    }
}
