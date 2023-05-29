import {Component} from '@angular/core';
import {productsMock} from 'src/app/shared/products/products.mock';

interface IShopCart {
    id: string | undefined;
    count: number;
}

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    readonly products = productsMock;
    productsCart: IShopCart[] = [];

    updateCartProducts(shopCart: IShopCart) {
        const isCartIncludes = this.productsCart.some(product => product.id === shopCart.id);

        if (!isCartIncludes) {
            this.productsCart = [...this.productsCart, {...shopCart}];
        }

        this.productsCart = this.productsCart.map(product => {
            if (product.id === shopCart.id) {
                return shopCart;
            }

            return product;
        });
    }
}
