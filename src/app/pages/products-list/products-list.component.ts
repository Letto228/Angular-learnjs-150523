import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {productsMock} from '../../shared/products/products.mock';
import {IProduct} from '../../shared/products/product.interface';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit {
    products: IProduct[] | null = null;

    constructor(
        // private readonly applicationRef: ApplicationRef,
        // private readonly ngZone: NgZone,
        private readonly changeDetectorRef: ChangeDetectorRef,
    ) {}

    testUser: {name: string} | null | undefined = {
        name: 'user',
    };

    ngOnInit(): void {
        setTimeout(() => {
            this.products = productsMock;
            this.changeDetectorRef.markForCheck();
        }, 3000);
    }

    get getFilteredProducts(): IProduct[] | null {
        // console.log('calculated products');

        return this.products; // sorting
    }

    trackBy(index: number, item: IProduct) {
        return item._id;
    }
}
