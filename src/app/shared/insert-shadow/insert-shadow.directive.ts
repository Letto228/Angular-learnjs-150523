import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
    selector: '[appInsertShadow]',
})
export class InsertShadowDirective {
    // @Output() toggle = new EventEmitter<number>();

    @HostListener('click', ['$event.clientX', '$event.clientY']) // <host-element (click)="onCLick()">
    // transition(x: number, y: number) {
    toggleShadow() {
        // this.toggle.emit(x);
        this.isBoxShadowActive = !this.isBoxShadowActive;
        // console.log('click', x, y);

        // this.boxShadow = !this.boxShadow ? 'inset 0 0 10px #000' : '';

        // return false;
    }

    @HostBinding('style.boxShadow')
    get boxShadow(): string {
        return this.isBoxShadowActive ? 'inset 0 0 10px #000' : '';
    }
    // boxShadow = '';

    private isBoxShadowActive = false;

    // constructor(private readonly elementRef: ElementRef) {
    //   console.log(this.elementRef.nativeElement);
    // }
}
