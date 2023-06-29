import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, switchMap} from 'rxjs';
import {ProductsApiService} from '../../shared/products/products-api.service';
import {addProducts, loadProducts} from './products.actions';

@Injectable()
export class ProductsEffects {
    constructor(
        private readonly action$: Actions,
        private readonly productsApiService: ProductsApiService,
    ) {}

    loadProducts$ = createEffect(
        () =>
            this.action$.pipe(
                // filter(action => action.type === loadProducts.type),
                ofType(loadProducts),
                switchMap(({subCategoryId}) =>
                    this.productsApiService
                        .getProducts$(subCategoryId)
                        .pipe(map(products => addProducts(products))),
                ),
            ),
        {dispatch: true},
    );
}
