import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterByProductNamePipe} from './filter-by-product-name.pipe';

@NgModule({
    declarations: [FilterByProductNamePipe],
    imports: [CommonModule],
    exports: [FilterByProductNamePipe],
})
export class FilterByProductNameModule {}
