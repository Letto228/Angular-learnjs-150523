import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IProduct} from '../../../shared/products/product.interface';

export interface IBuyActionData {
    [productId: string]: {
        product: IProduct | undefined;
        quantity: number;
    };
}
@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() product: IProduct | undefined;
    @Output() buyAction = new EventEmitter<IBuyActionData>();

    onProductBuy(event: Event) {
        event.stopPropagation();

        if (this.product) {
            this.buyAction.emit({[this.product.name]: {product: this.product, quantity: 1}});
        }
    }

    isStarActive(starIndex: number): boolean {
        if (this.product) {
            return this.product.rating >= starIndex;
        }

        return false;
    }
}
