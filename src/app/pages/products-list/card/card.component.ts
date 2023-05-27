import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IProduct} from 'src/app/shared/products/product.interface';
// import {productsMock} from '../../../shared/products/products.mock';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('product') product: IProduct | undefined;
    @Output() isAddedToCart = new EventEmitter<string>();

    onProductBuy(event: Event) {
        event.stopPropagation();

        // eslint-disable-next-line no-console
        console.log('Buy product');
        this.isAddedToCart.emit(this.product?._id);
    }

    isStarActive(starIndex: number): boolean {
        return this.product ? this.product.rating >= starIndex : false;
    }
}
