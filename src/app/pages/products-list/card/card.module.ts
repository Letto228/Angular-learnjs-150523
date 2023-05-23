import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {CardComponent} from './card/card.component';

@NgModule({
    declarations: [CardComponent],
    imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatListModule],
    exports: [CardComponent],
})
export class CardModule {}
