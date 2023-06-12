import {Component} from '@angular/core';
import {productsMock} from 'src/app/shared/products/products.mock';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    readonly products = productsMock;

    handleBuyBtnClicked(productId: string): void {
        // eslint-disable-next-line no-console
        console.log(`Product list: product with id ${productId} was bought`);
    }
}
