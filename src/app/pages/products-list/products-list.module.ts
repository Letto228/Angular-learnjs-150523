import {NgModule} from '@angular/core';
import {LoadScrollModule} from 'src/app/shared/load-scroll/load-scroll.module';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {DumpNgIfModule} from '../../shared/dump-ng-if/dump-ng-if.module';
import {CardModule} from './card/card.module';
import {ProductsListComponent} from './products-list.component';

@NgModule({
    declarations: [ProductsListComponent],
    imports: [CommonModule, CardModule, DumpNgIfModule, MatProgressSpinnerModule, LoadScrollModule],
    exports: [ProductsListComponent],
})
export class ProductsListModule {}
