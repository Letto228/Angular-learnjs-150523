import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {RatingModule} from '../../../shared/rating/rating.module';
import {CardComponent} from './card.component';

@NgModule({
    declarations: [CardComponent],
    exports: [CardComponent],
    imports: [
        CommonModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        RatingModule,
    ],
})
export class CardModule {}
