import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {DirectionEnum} from './direction.enum';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Output() loadData = new EventEmitter<DirectionEnum>();

    @Input() offsetLength = 0;

    @HostListener('scroll', ['$event.target'])
    onWindowScroll(target: HTMLElement): void {
        if (target.scrollTop < this.offsetLength) {
            this.loadData.emit(DirectionEnum.UP);
        }

        if (target.scrollHeight - target.offsetHeight - target.scrollTop < this.offsetLength) {
            this.loadData.emit(DirectionEnum.DOWN);
        }
    }
}
