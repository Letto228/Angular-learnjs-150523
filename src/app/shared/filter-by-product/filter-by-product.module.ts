import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterByProductPipe} from './filter-by-product.pipe';

@NgModule({
    declarations: [FilterByProductPipe],
    imports: [CommonModule],
    exports: [FilterByProductPipe],
})
export class FilterByProductModule {}
