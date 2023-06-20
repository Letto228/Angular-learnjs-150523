import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScrollWithLoadingDirective} from './scroll-with-loading.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [ScrollWithLoadingDirective],
    exports: [ScrollWithLoadingDirective],
})
export class ScrollWithLoadingModule {}
