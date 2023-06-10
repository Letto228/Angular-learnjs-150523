import {ChangeDetectionStrategy, Component} from '@angular/core';
import {productsMock} from '../../shared/products/products.mock';
import {IProduct} from '../../shared/products/product.interface';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
    products: IProduct[] | null = productsMock;

    get getFilteredProducts(): IProduct[] | null {
        // console.log('calculated products');

        return this.products; // sorting
    }

    trackBy(index: number, item: IProduct) {
        return item._id;
    }
}
