import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

export enum LoadDirection {
    scrollTop = 'top',
    scrollBottom = 'bottom',
}

@Directive({
    selector: '[appLoadScroll]',
})
export class LoadScrollDirective {
    @Output() sentEvent = new EventEmitter<string>();
    private eventSent = false;

    @HostListener('scroll', ['$event']) isScroll(event: Event) {
        const target = event.target as HTMLElement;
        const scrollTop = target.scrollTop;

        if (!this.eventSent) {
            if (scrollTop > 100) {
                this.eventSent = true;
                this.sentEvent.emit(LoadDirection.scrollTop);
            } else {
                this.eventSent = true;
                this.sentEvent.emit(LoadDirection.scrollBottom);
            }
        }
    }
}
