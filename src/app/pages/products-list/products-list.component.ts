import {Component} from '@angular/core';
import {productsMock} from '../../shared/products/products.mock';
import {IProduct} from '../../shared/products/product.interface';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    readonly products = productsMock;

    trackById(_: number, product: IProduct) {
        return product._id;
    }

    addToBasket(productId: IProduct['_id']): void {
        // eslint-disable-next-line no-console
        console.log('Add to basket product with Id ', productId);
    }
}
