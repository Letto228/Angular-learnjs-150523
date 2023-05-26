import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IProduct} from '../../../shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() product: IProduct | undefined;
    @Output() buy = new EventEmitter<IProduct>();

    onProductBuy() {
        if (this.product) {
            this.buy.emit(this.product);
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
