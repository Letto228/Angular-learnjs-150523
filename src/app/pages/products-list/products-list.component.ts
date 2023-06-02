import {Component} from '@angular/core';
import {productsMock} from 'src/app/shared/products/products.mock';
import {IShopCart} from './shop-cart.interface';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    readonly products = productsMock;
    productsCart: IShopCart = {};

    updateCartProducts(shopCart: IShopCart) {
        this.productsCart = {...this.productsCart, ...shopCart};
    }
}
