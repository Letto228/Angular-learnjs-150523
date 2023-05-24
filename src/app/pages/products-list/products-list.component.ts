import {Component} from '@angular/core';
import {productMock} from '../../shared/products/product.mock';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    product = productMock;
    count = 0;

    onClick(e: Event) {
        e.stopPropagation();
        this.count += 1;
    }
}
