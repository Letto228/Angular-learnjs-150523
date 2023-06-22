import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, tap, switchMap, startWith} from 'rxjs';
import {FormControl} from '@angular/forms';
import {IProduct} from '../../shared/products/product.interface';
import {ProductsStoreService} from '../../shared/products/products-store.service';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
    readonly products$ = this.activatedRoute.paramMap.pipe(
        map(paramMap => paramMap.get('subCategoryId')),
        tap(subCategoryId => {
            this.productsStoreService.loadProducts(subCategoryId);
        }),
        switchMap(() => this.productsStoreService.products$),
    );
    // eslint-disable-next-line dot-notation
    // readonly products$ = this.activatedRoute.data.pipe(map(data => data['products'] as IProduct[]));

    textControl = new FormControl('test', {
        updateOn: 'submit',
    });

    counterControl = new FormControl(4);
    counterControlValue$ = this.counterControl.valueChanges.pipe(
        startWith(this.counterControl.value),
        // eslint-disable-next-line no-console
        tap(console.log),
    );

    counter = 3;

    constructor(
        private readonly productsStoreService: ProductsStoreService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly changeDetectorRef: ChangeDetectorRef,
    ) {
        setTimeout(() => {
            // this.counterControl.setValue(6);

            this.counter = 7;
            this.changeDetectorRef.markForCheck();
        }, 4000);
    }

    trackBy(_index: number, item: IProduct) {
        return item._id;
    }
}
