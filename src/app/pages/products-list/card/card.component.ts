import {Component} from '@angular/core';
import {IProduct} from '../../../shared/products/product.interface';
import {productMock} from '../../../shared/products/product.mock';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    readonly product: IProduct = productMock;

    currentImageIndex = 0;

    showNextImage(e: Event): void {
        e.stopPropagation();

        if (this.currentImageIndex >= this.product.images.length - 1) {
            this.currentImageIndex = 0;

            return;
        }

        this.currentImageIndex += 1;
    }

    showPrevImage(e: Event): void {
        e.stopPropagation();

        if (!this.currentImageIndex) {
            this.currentImageIndex = this.product.images.length - 1;

            return;
        }

        this.currentImageIndex -= 1;
    }

    buyProduct(e: Event): void {
        e.stopPropagation();

        console.info('Buy Product');
    }
}
