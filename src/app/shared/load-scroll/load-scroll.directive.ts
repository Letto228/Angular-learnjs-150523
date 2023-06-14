import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {LoadDirection} from '../load-direction-enum';

@Directive({
    selector: '[appLoadScroll]',
})
export class LoadScrollDirective {
    @Output() sentEvent = new EventEmitter<LoadDirection>();
    private eventTop = false;
    private eventBottom = false;

    @HostListener('scroll', ['$event']) isScroll(event: Event) {
        const scrollTop = (event.target as HTMLElement).scrollTop;
        const scrollHeight = (event.target as HTMLElement).scrollHeight;
        const clientHeight = (event.target as HTMLElement).clientHeight;
        const bottomOffSet = scrollHeight - scrollTop - clientHeight;

        if (!this.eventTop && scrollTop <= 100) {
            this.eventTop = true;
            this.eventBottom = false;
            this.sentEvent.emit(LoadDirection.scrollTop);
        }

        if (!this.eventBottom && bottomOffSet <= 100) {
            this.eventBottom = true;
            this.eventTop = false;
            this.sentEvent.emit(LoadDirection.scrollBottom);
        }
    }
}
