import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {CardComponent} from './components/card/card.component';

@NgModule({
    declarations: [CardComponent],
    imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
    exports: [CardComponent],
})
export class CardModule {}
