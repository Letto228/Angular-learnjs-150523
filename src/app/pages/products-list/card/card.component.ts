import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IProduct} from 'src/app/shared/products/product.interface';

interface IShopCart {
    id: string | undefined;
    count: number;
}

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input()
    product: IProduct | undefined = undefined;

    shopCart = {id: this.product?._id, count: 0};

    @Output()
    shopCartChange = new EventEmitter<IShopCart>();

    onProductBuy(event: Event) {
        event.stopPropagation();

        this.shopCart = {...this.shopCart, id: this.product?._id, count: this.shopCart.count + 1};
        this.shopCartChange.emit(this.shopCart);
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
