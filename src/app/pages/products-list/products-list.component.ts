import {Component} from '@angular/core';
import {IProduct} from 'src/app/shared/products/product.interface';
import {productsMock} from 'src/app/shared/products/products.mock';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    productList: IProduct[] = productsMock;
    shopCart: string[] = [];

    addProductToCart(id: string) {
        this.shopCart.push(id);
    }
}
