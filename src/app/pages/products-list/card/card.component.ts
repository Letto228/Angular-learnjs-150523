import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IProduct} from 'src/app/shared/products/product.interface';
import {IShopCart} from '../shop-cart.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input()
    product: IProduct | undefined = undefined;

    @Input()
    shopCart: IShopCart = {};

    @Output()
    shopCartChange = new EventEmitter<IShopCart>();

    onProductBuy(event: Event) {
        event.stopPropagation();

        if (!this.product?._id) {
            return;
        }

        const idCard: string = this.product?._id;
        const countCard: number = idCard in this.shopCart ? this.shopCart[idCard] + 1 : 1;

        this.shopCart = {...this.shopCart, [idCard]: countCard};
        this.shopCartChange.emit(this.shopCart);
        // eslint-disable-next-line no-console
        console.log('Buy product');
    }

    isStarActive(starIndex: number): boolean {
        return this.product ? this.product.rating >= starIndex : false;
    }
}
