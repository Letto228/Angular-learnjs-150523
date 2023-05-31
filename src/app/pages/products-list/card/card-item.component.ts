import {Component} from '@angular/core';
import {productMock} from '../../../shared/products/product.mock';

@Component({
    selector: 'app-card-item',
    templateUrl: './card-item.component.html',
    styleUrls: ['./card-item.component.css'],
})
export class CardItemComponent {
    readonly product = productMock;

    addToCart(event: Event) {
        event.stopPropagation();
        // eslint-disable-next-line no-console
        console.log(event);
    }
}
