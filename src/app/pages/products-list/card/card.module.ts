import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CardComponent} from './card.component';

@NgModule({
    declarations: [CardComponent],
    imports: [
        CommonModule,
        MatCardModule,
        MatListModule,
        MatButtonModule,
        MatBadgeModule,
        NgOptimizedImage,
        MatTooltipModule,
    ],
    exports: [CardComponent],
})
export class CardModule {}
