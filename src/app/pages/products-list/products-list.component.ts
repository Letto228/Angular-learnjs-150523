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
        // // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // let count = 0;

        // setInterval(() => {
        //     count += 1;
        // }, 1000);

        // this.ngZone.runOutsideAngular(() => {

        // });
        // this.ngZone.run(() => {

        // });

        // this.changeDetectorRef.detach();
        // this.changeDetectorRef.detectChanges();

        setTimeout(() => {
            this.products = productsMock;
            this.changeDetectorRef.markForCheck();
            // this.changeDetectorRef.detectChanges();
        }, 3000);
        // setTimeout(() => {
        //     this.products = productsMock.map(item => ({...item, rating: 5}));
        //     // this.changeDetectorRef.markForCheck();
        //     this.changeDetectorRef.detectChanges();
        // }, 6000);

        // setTimeout(() => {
        //     this.changeDetectorRef.reattach();
        // }, 7000);

        // setTimeout(() => {
        //     this.products = productsMock.map(item => ({...item, rating: 1}));
        //     this.changeDetectorRef.markForCheck();
        // }, 9000);
    }

    get getFilteredProducts(): IProduct[] | null {
        // console.log('calculated products');

        return this.products; // sorting
    }

    trackBy(index: number, item: IProduct) {
        return item._id;
    }
}
