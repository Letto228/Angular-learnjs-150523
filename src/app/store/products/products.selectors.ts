import {createFeatureSelector} from '@ngrx/store';
import {IProductsState, PRODUCTS_FEATURE, productsAdapter} from './products.state';

// export const productsFeatureSelector = (state: IState) => state[PRODUCTS_FEATURE];
export const productsFeatureSelector = createFeatureSelector<IProductsState>(PRODUCTS_FEATURE);

// export const productsIdsSelector = createSelector(
//     productsFeatureSelector,
//     (productsState: IProductsState) => productsState.ids, // extractCb
// );
// export const productsIdsSelector = (state: IState) => extractCb(productsFeatureSelector(state));

// export const productsEntitiesSelector = createSelector(
//     productsFeatureSelector,
//     (productsState: IProductsState) => productsState.entities, // extractCb
// );
// export const productsEntitiesSelector = (state: IState) => extractCb(productsFeatureSelector(state));

// export const productsSelector = createSelector(
//     productsIdsSelector,
//     productsEntitiesSelector,
//     (ids: IProductsState['ids'], entities: IProductsState['entities']) =>
//         ids.map(id => entities[id]), // extractCb
// );
// export const productsSelector = (state: IState) => extractCb(productsIdsSelector(state), productsEntitiesSelector(state));

export const {
    selectAll: productsSelector,
    selectEntities: productsEntitiesSelector,
    selectIds: productsIdsSelector,
} = productsAdapter.getSelectors(productsFeatureSelector);

// export const productsIdsSelector = createSelector(
//     productsFeatureSelector,
//     selectIds, // extractCb
// );
// export const productsIdsSelector = (state: IState) => selectIds(productsFeatureSelector(state));

// export const productsEntitiesSelector = createSelector(
//     productsFeatureSelector,
//     selectEntities, // extractCb
// );
// export const productsEntitiesSelector = (state: IState) => selectEntities(productsFeatureSelector(state));

// export const productsSelector = createSelector(
//     productsFeatureSelector,
//     selectAll, // extractCb
// );
// export const productsSelector = (state: IState) => selectAll(productsIdsSelector(state), productsEntitiesSelector(state));
