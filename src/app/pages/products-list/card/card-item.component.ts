import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {IProduct} from '../../../shared/products/product.interface';

@Component({
    selector: 'app-card-item',
    templateUrl: './card-item.component.html',
    styleUrls: ['./card-item.component.css'],
})
export class CardItemComponent implements OnChanges {
    @Input() product: IProduct | undefined;
    @Output() add = new EventEmitter<IProduct['_id']>();

    addToCart(event: Event) {
        event.stopPropagation();
        this.add.emit(this.product!._id);
        // eslint-disable-next-line no-console
        console.log('from Card-item:', event);
    }

    ngOnChanges({product}: SimpleChanges): void {
        // eslint-disable-next-line no-console
        console.log('from Card-item => ngOnChanges:', product);
    }
}
