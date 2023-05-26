import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IProduct} from '../../../shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input()
    product: IProduct | undefined = undefined;

    @Output()
    buyProduct = new EventEmitter<IProduct>();

    onProductBuy(event: Event) {
        event.stopPropagation();

        if (this.product) {
            this.buyProduct.emit(this.product);
        }

        // eslint-disable-next-line no-console
        console.log('Buy product');
    }

    isStarActive(starIndex: number): boolean {
        if (this.product) {
            return this.product.rating >= starIndex;
        }

        return false;
    }
}
