import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {CategoriesSelectComponent} from './categories-select.component';
import {RouterLink} from '@angular/router';

@NgModule({
    declarations: [CategoriesSelectComponent],
    imports: [CommonModule, MatButtonModule, MatExpansionModule, RouterLink],
    exports: [CategoriesSelectComponent],
})
export class CategoriesSelectModule {}
