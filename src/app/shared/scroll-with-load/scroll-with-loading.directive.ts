import {Directive, Output, EventEmitter, HostListener} from '@angular/core';
import {LoadDirection} from './load-direction';
import {bottomLoadCondition} from './utils/bottom-load-condition';
import {upLoadCondition} from './utils/up-load-condition';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Output() loadData = new EventEmitter<LoadDirection>();

    private prevScrollTop = -1; // Значение требуется для сравнения, из него можно вычислить направление скролла.

    @HostListener('scroll', ['$event.target']) scrollAction({
        scrollHeight,
        clientHeight,
        scrollTop,
    }: HTMLElement) {
        const prevScrollTop = this.prevScrollTop; // Сохраняем предыдущее значение скролла

        this.prevScrollTop = scrollTop; // Заменяем текущим значением скролла

        const lowerScrollPosition = scrollHeight - clientHeight; // Нижнее значение на которое может быть промотан скролл. lowerScrollPosition + clientHeight = scrollHeight

        const loadDown = bottomLoadCondition(scrollTop, lowerScrollPosition, prevScrollTop);

        if (loadDown) {
            this.loadData.emit(LoadDirection.DOWN);

            return;
        }

        const loadUp = upLoadCondition(scrollTop, prevScrollTop);

        if (loadUp) {
            this.loadData.emit(LoadDirection.UP);
        }
    }
}
