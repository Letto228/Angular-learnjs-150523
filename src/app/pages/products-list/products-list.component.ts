import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap, tap} from 'rxjs';
import {IProduct} from '../../shared/products/product.interface';
import {ProductsStoreService} from '../../shared/products/products-store.service';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
    readonly products$ = this.activatedRoute.queryParamMap.pipe(
        map(queryParamMap => queryParamMap.get('sub-category-id')),
        tap(subCategoryId => {
            this.productsStoreService.loadProducts(subCategoryId);
        }),
        switchMap(() => this.productsStoreService.products$),
    );

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly productsStoreService: ProductsStoreService,
        private readonly router: Router,
        @Inject('name') private readonly name: string,
    ) {
        // eslint-disable-next-line no-console
        console.log('ProductsListComponent', this.name);
    }

    trackBy(_index: number, item: IProduct) {
        return item._id;
    }

    navigateToProduct() {
        // this.router.navigate(['/product/id']);
        // this.router.navigate(['/product', 'id']);
        // this.router.navigateByUrl(['/product', 'id'].join('/'));
        this.router.navigateByUrl('/product/id');
    }
}
