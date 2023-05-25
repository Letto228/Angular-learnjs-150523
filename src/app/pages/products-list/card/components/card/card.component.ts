import {Component} from '@angular/core';
import {IProduct} from 'src/app/shared/products/product.interface';
import {IProductImage} from 'src/app/shared/products/product-image.interface';
import {productMock} from 'src/app/shared/products/product.mock';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    readonly productMock: IProduct = productMock;
    previewImg: IProductImage = productMock.images[0];

    buyItem(event: Event) {
        // eslint-disable-next-line no-console
        console.log('buyItem event: ', event);
        event.stopPropagation();
    }
}
