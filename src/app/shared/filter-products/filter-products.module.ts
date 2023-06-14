import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterProductsPipe} from './filter-products.pipe';

@NgModule({
    declarations: [FilterProductsPipe],
    imports: [CommonModule],
    exports: [FilterProductsPipe],
})
export class FilterProductsModule {}
