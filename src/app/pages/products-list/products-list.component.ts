import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, tap, switchMap, filter} from 'rxjs';
import {IProduct} from '../../shared/products/product.interface';
import {ProductsStoreService} from '../../shared/products/products-store.service';
import {BrandsService} from '../../shared/brands/brands.service';
import {IProductsFilter} from './filter/products-filter.interface';

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

    readonly brands$ = this.activatedRoute.paramMap.pipe(
        map(paramMap => paramMap.get('subcategoryId')),
        tap(id => {
            this.brandsService.loadBrands(id);
        }),
        switchMap(() => this.brandsService.brands$),
    );

    readonly queryParams$ = this.activatedRoute.queryParamMap.pipe(
        map(queryParams => {
            return queryParams.get('search') || '';
        }),
        filter(Boolean),
    );

    constructor(
        private readonly productsStoreService: ProductsStoreService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly brandsService: BrandsService,
        private readonly router: Router,
    ) {}

    trackBy(_index: number, item: IProduct) {
        return item._id;
    }

    applyFilter(productsFilter: IProductsFilter) {
        this.router.navigate(['products-list'], {
            queryParams: {
                search: productsFilter.name,
                min: productsFilter.priceRange.min,
                max: productsFilter.priceRange.max,
            },
        });
    }
}
