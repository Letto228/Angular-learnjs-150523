import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsListComponent} from './products-list.component';
import {CardModule} from './card/card.module';
import {CardItemComponent} from './card/card-item.component';

@NgModule({
    declarations: [ProductsListComponent],
    imports: [CommonModule, CardModule],
    exports: [ProductsListComponent, CardItemComponent],
})
export class ProductsListModule {}
