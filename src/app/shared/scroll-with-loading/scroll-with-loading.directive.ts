import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Output()
    loadData = new EventEmitter();

    @HostListener('scroll', ['$event.target.scrollTop'])
    onScroll(scrollTop: number) {
        if (scrollTop > 100) {
            // eslint-disable-next-line no-console
            console.log('directive', scrollTop);
            this.loadData.emit(scrollTop);
        }
    }
}
