import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {CardComponent} from './card.component';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    declarations: [CardComponent],
    imports: [CommonModule, MatCardModule, MatButtonModule],
    exports: [CardComponent],
})
export class CardModule {}
