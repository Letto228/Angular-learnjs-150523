import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, tap, switchMap} from 'rxjs';
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

    //  вариант 1
    // readonly searchQuery$ = this.activatedRoute.queryParamMap.pipe(
    //     map(queryparams => (queryparams.get('search') !== null ? queryparams.get('search') : '')),
    // );

    //  вариант 2
    searchQuery = '';
    setSearch(form: IProductsFilter) {
        this.setQueryparams(form);
    }

    setQueryparams(form: IProductsFilter) {
        this.router.navigate(['products-list'], {
            queryParams: {
                search: form.name,
                min: form.priceRange.min,
                max: form.priceRange.max,
            },
        });
        this.searchQuery = form.name;
    }

    constructor(
        private readonly productsStoreService: ProductsStoreService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly brandsService: BrandsService,
        private readonly router: Router,
    ) {}

    trackBy(_index: number, item: IProduct) {
        return item._id;
    }
}
