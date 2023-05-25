import {Component} from '@angular/core';
import {productMock} from '../../../shared/products/product.mock';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    product = productMock;
    count = 0;

    onClick(event: Event) {
        event.stopPropagation();
        this.count += 1;
    }
}
