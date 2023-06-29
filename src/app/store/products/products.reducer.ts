import {createReducer, on} from '@ngrx/store';
import {IProductsState, productsAdapter} from './products.state';
import {addProducts} from './products.actions';

// const productsInitialState: IProductsState = {
//     ids: [],
//     entities: {},
//     currentProductId: null,
// };
const productsInitialState: IProductsState = productsAdapter.getInitialState({
    currentProductId: null,
});

export const productsReducer = createReducer(
    productsInitialState,
    on(addProducts, (state, {products}) => productsAdapter.setAll(products, state)),
);
