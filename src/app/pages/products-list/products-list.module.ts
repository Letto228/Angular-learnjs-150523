import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProductsListComponent} from './products-list.component';
import {CardModule} from './card/card.module';
import {PaginationModule} from '../../shared/pagination/pagination.module';
import {FilterByPropertyModule} from '../../shared/filter-by-property/filter-by-property.module';
import {ProductsListRoutingModule} from './products-list-routing.module';
import {CounterInputModule} from '../../shared/counter-input/counter-input.module';

@NgModule({
    declarations: [ProductsListComponent],
    imports: [
        CommonModule,
        CardModule,
        MatProgressSpinnerModule,
        PaginationModule,
        MatIconModule,
        MatButtonModule,
        FilterByPropertyModule,
        RouterModule,
        ProductsListRoutingModule,
        CounterInputModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    exports: [ProductsListComponent],
})
export class ProductsListModule {}
