import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IProduct} from 'src/app/shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() product: IProduct | undefined;

    @Output() buyProduct = new EventEmitter<IProduct['_id']>();

    onProductBuy(event: Event) {
        event.stopPropagation();
        // eslint-disable-next-line no-console
        console.log('Buy product');
        this.buyProduct.emit(this.product?._id);
    }

    isStarActive(starIndex: number): boolean {
        //   return this.product!.rating >= starIndex;
        return !!this.product && this.product.rating >= starIndex;
    }
}
