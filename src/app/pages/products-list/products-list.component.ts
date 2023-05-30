import {Component} from '@angular/core';
import {productsMock} from '../../shared/products/products.mock';
import {IBuyActionData} from './card/card.component';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    protected readonly productsMock = productsMock;

    buyActionHandler(product: IBuyActionData) {
        // eslint-disable-next-line no-console
        console.log(product);
    }
}
