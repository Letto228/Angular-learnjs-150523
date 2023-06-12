import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadScrollDirective} from './load-scroll.directive';

@NgModule({
    declarations: [LoadScrollDirective],
    imports: [CommonModule],
    exports: [LoadScrollDirective],
})
export class LoadScrollModule {}
