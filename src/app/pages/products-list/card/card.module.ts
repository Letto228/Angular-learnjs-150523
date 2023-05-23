import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {CardItemComponent} from './card-item.component';

@NgModule({
    declarations: [CardItemComponent],
    imports: [CommonModule, MatCardModule, MatButtonModule],
    exports: [CardItemComponent],
})
export class CardModule {}
