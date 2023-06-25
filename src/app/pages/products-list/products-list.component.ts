import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IProduct} from '../../shared/products/product.interface';
import {ProductsStoreService} from '../../shared/products/products-store.service';
import {map, switchMap, tap} from 'rxjs';
import {ISubCategory} from '../../shared/categories/sub-category.interface';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
    readonly products$ = this.activatedRoute.paramMap.pipe(
        map(paramMap => paramMap.get('id')),
        tap((subCatId: ISubCategory['_id'] | null) => {
            return this.productsStoreService.loadProducts(subCatId);
        }),
        switchMap(() => {
            return this.productsStoreService.products$;
        }),
    );

    constructor(
        private readonly productsStoreService: ProductsStoreService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
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
