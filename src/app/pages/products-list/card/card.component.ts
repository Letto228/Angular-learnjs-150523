import {Component} from '@angular/core';
import {productMock} from '../../../shared/products/product.mock';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    readonly feedbackText: string = 'Кол-во отзывов';
    readonly ratingText: string = 'Рейтинг товара';
    readonly priceText: string = 'Цена';

    readonly cardId = productMock._id;
    readonly cardFeedbackCount = productMock.feedbacksCount.toString();
    readonly cardSubCategory = productMock.subCategory;
    readonly cardName = productMock.name;
    readonly cardPrice = productMock.price.toString();
    readonly cardRating = productMock.rating.toString();
    readonly cardImage = productMock.images[0];

    onClick(): void {
        console.warn(`ADDED TO BASKET`);
    }
}
