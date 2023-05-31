import {Component} from '@angular/core';
import {IProduct} from 'src/app/shared/products/product.interface';
import {productMock} from 'src/app/shared/products/product.mock';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
    product: IProduct;

    constructor() {
        this.product = productMock;
    }

    onProductBuy(event: Event) {
        event.stopPropagation();
    }

    getRatingIcons(rating: number): number[] {
        const iconsNew: number = Math.ceil(rating);

        return Array.from({length: iconsNew}, (_, index) => ++index);
    }
}
