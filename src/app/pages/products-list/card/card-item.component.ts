import {Component} from '@angular/core';
import {productMock} from '../../../shared/products/product.mock';

@Component({
    selector: 'app-card-item',
    templateUrl: './card-item.component.html',
    styleUrls: ['./card-item.component.css'],
})
export class CardItemComponent {
    product = productMock;
    title = productMock.name;
    image = productMock.images[0];
}
