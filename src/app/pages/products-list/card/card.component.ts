import {Component} from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    buy(event: Event): void {
        // console.log('Товар куплен!');
        event.stopPropagation();
    }
}
