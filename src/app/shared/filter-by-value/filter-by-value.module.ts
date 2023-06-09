import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterByValuePipe} from './filter-by-value.pipe';

@NgModule({
    declarations: [FilterByValuePipe],
    exports: [FilterByValuePipe],
    imports: [CommonModule],
})
export class FilterByValueModule {}
