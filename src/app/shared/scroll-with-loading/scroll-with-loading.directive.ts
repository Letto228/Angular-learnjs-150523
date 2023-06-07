import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {LoadDirectionEnum} from './load-direction.enum';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Output() loadData = new EventEmitter<LoadDirectionEnum>();
    @HostListener('scroll', ['$event.target'])
    onScroll(event: HTMLElement): void {
        if (this.timeoutID) {
            clearTimeout(this.timeoutID);
        }

        this.timeoutID = setTimeout(() => {
            if (this.isTop(event.scrollTop)) {
                this.sendLoadData(LoadDirectionEnum.Top);
            }

            if (this.isBottom(event)) {
                this.sendLoadData(LoadDirectionEnum.Bottom);
            }
        }, 500);
    }

    private timeoutID = -1;
    private readonly onTop = 0;
    private readonly borderOffset = 100;

    private isTop(currentTop: number): boolean {
        return currentTop <= this.onTop + this.borderOffset;
    }

    private isBottom(event: HTMLElement): boolean {
        return event.offsetHeight + event.scrollTop + this.borderOffset >= event.scrollHeight;
    }

    private sendLoadData(content: LoadDirectionEnum) {
        this.loadData.emit(content);
    }
}
