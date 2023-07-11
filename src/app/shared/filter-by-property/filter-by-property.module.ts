import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterByPropertyPipe} from './filter-by-property.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [FilterByPropertyPipe],
    exports: [FilterByPropertyPipe],
})
export class FilterByPropertyModule {}
