import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IProduct} from 'src/app/shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() product: IProduct | undefined = undefined;
    @Output() isProductBuy = new EventEmitter<string>();

    onProductBuy(event: Event) {
        event.stopPropagation();
        this.isProductBuy.emit(this.product?._id || '0');
    }

    isStarActive(starIndex: number): boolean {
        if (this.product?.rating) {
            return this.product?.rating >= starIndex;
        }

        return false;
    }
}
