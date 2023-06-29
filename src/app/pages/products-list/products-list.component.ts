import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, tap, switchMap, take} from 'rxjs';
import {Store, select} from '@ngrx/store';
import {IProduct} from '../../shared/products/product.interface';
import {BrandsService} from '../../shared/brands/brands.service';
import {getFilterFromQuery} from './filter/query-params/get-filter-from-query';
import {IProductsFilterQueryParams} from './filter/query-params/products-filter-query-params.interface';
import {IProductsFilter} from './filter/products-filter.interface';
import {getQueryFromFilter} from './filter/query-params/get-query-from-filter';
import {IState} from '../../store/reducer';
import {productsSelector} from '../../store/products/products.selectors';
import {loadProducts} from '../../store/products/products.actions';

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
            this.store$.dispatch(loadProducts(subCategoryId));
            // this.productsStoreService.loadProducts(subCategoryId);
        }),
        switchMap(() =>
            this.store$.pipe(
                // map(
                //     state =>
                //         state[PRODUCTS_FEATURE].ids.map(
                //             id => state[PRODUCTS_FEATURE].entities[id],
                //         ) as IProduct[],
                // ),
                // select(
                //     state =>
                //         state[PRODUCTS_FEATURE].ids.map(
                //             id => state[PRODUCTS_FEATURE].entities[id],
                //         ) as IProduct[],
                // ),
                select(productsSelector),
            ),
        ),
    );

    readonly brands$ = this.activatedRoute.paramMap.pipe(
        map(paramMap => paramMap.get('subcategoryId')),
        tap(id => {
            this.brandsService.loadBrands(id);
        }),
        switchMap(() => this.brandsService.brands$),
    );

    readonly initialFilter$ = this.activatedRoute.queryParams.pipe(
        take(1),
        map(queryParams => getFilterFromQuery(queryParams as IProductsFilterQueryParams)),
    );

    readonly searchName$ = this.activatedRoute.queryParamMap.pipe(
        map(queryParamMap => queryParamMap.get('name')),
    );

    constructor(
        // private readonly productsStoreService: ProductsStoreService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
        private readonly brandsService: BrandsService,
        private readonly store$: Store<IState>,
    ) {}

    trackBy(_index: number, item: IProduct) {
        return item._id;
    }

    onFilterChange(filter: IProductsFilter) {
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: getQueryFromFilter(filter),
        });
    }
}
