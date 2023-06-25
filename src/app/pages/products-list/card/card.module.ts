import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {CarouselModule} from '../../../shared/carousel/carousel.module';
import {CurrencyModule} from '../../../shared/currency/currency.module';
import {CardComponent} from './card.component';

@NgModule({
    declarations: [CardComponent],
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        CarouselModule,
        CurrencyModule,
    ],
    // providers: [
    //     Service1,
    //     Service2,
    // ],
    exports: [CardComponent],
})
export class CardModule {}
