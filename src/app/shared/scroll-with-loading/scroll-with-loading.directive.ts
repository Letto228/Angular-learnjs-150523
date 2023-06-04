import {Directive, EventEmitter, HostListener, OnDestroy, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {LoadDirectionEnum} from './load-direction.enum';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective implements OnDestroy {
    @Output() loadData = new EventEmitter<LoadDirectionEnum>();
    @HostListener('scroll', ['$event.target'])
    onScroll(event: HTMLElement): void {
        if (this.timeoutID) {
            clearTimeout(this.timeoutID);
        }

        setTimeout(() => {
            if (this.isTop(event.scrollTop)) {
                this.sendLoadData(LoadDirectionEnum.Top);
            }

            if (this.isBottom(event)) {
                this.sendLoadData(LoadDirectionEnum.Bottom);
            }
        }, 500);
    }

    private readonly timeoutID: number = -1;
    private readonly onTop = 0;
    private readonly borderOffset = 100;
    private readonly destroy$ = new Subject<void>();

    private isTop(currentTop: number): boolean {
        return currentTop <= this.onTop + this.borderOffset;
    }

    private isBottom(event: HTMLElement): boolean {
        return event.offsetHeight + event.scrollTop + this.borderOffset >= event.scrollHeight;
    }

    private sendLoadData(content: LoadDirectionEnum) {
        this.loadData.emit(content);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
