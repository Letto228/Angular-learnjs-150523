import {Component} from '@angular/core';
import {productMock} from '../../../shared/products/product.mock';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    readonly data = productMock;

    buyHandler(event: MouseEvent) {
        event.stopImmediatePropagation();
        // eslint-disable-next-line no-console
        console.log('Товар куплен');
    }
}
