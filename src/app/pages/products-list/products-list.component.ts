import {Component} from '@angular/core';
import {IProduct} from 'src/app/shared/products/product.interface';
import {productsMock} from 'src/app/shared/products/products.mock';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    readonly firstProduct: IProduct = productsMock[0];

    isBuyed(id: string): void {
        // eslint-disable-next-line no-console
        console.log('Product is added to cart in Parent by its id:', id);
    }
}
