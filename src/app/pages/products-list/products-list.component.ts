import {Component, OnInit} from '@angular/core';
import {productsMock} from '../../shared/products/products.mock';
import {IProduct} from '../../shared/products/product.interface';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
    products: IProduct[] | null = null;

    ngOnInit(): void {
        setTimeout(() => {
            this.products = productsMock;
        }, 3000);
    }

    get getFilteredProducts(): IProduct[] | null {
        // console.log('calculated products');

        return this.products; // sorting
    }

    onToggle(event: unknown) {
        // eslint-disable-next-line no-console
        console.log(event);
    }
}
