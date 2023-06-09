import {Component} from '@angular/core';
import {productsMock} from '../../shared/products/product.mock';
import {IProduct} from '../../shared/products/product.interface';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    readonly products: IProduct[] = productsMock;

    addToCard(id: IProduct['_id']) {
        // eslint-disable-next-line no-console
        console.log('from Product-list:', id);
    }
}
