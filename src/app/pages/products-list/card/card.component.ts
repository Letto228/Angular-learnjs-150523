import { Component } from '@angular/core';
import { productMock } from 'src/app/shared/products/product.mock';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    productData = productMock;
    name = this.productData.name;
    price = this.productData.price;
    rating = this.productData.rating;
    imgUrl = this.productData.images[0].url;
}
