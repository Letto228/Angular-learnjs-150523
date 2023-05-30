import {Component} from '@angular/core';
import {IProduct} from 'src/app/shared/products/product.interface';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    selectNewProduct(id: IProduct['_id']) {
        // eslint-disable-next-line no-console
        console.log(id);
    }
}
