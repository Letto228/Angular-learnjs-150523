import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsListComponent} from './products-list.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    declarations: [ProductsListComponent],
    imports: [CommonModule, MatCardModule, MatButtonModule],
    exports: [ProductsListComponent],
})
export class ProductsListModule {}
