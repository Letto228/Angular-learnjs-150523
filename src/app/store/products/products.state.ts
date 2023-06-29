import {EntityState, createEntityAdapter} from '@ngrx/entity';
import {IProduct} from '../../shared/products/product.interface';

export const PRODUCTS_FEATURE = 'products';

// export type IProductsState = IProduct[];
// export interface IProductsState {
//     ids: string[]; // ids.map(id => entities[id])
//     entities: {[id: IProduct['_id']]: IProduct};
// }

// export type IProductsState = EntityState<IProduct>;
export interface IProductsState extends EntityState<IProduct> {
    currentProductId: IProduct['_id'] | null;
}

export const productsAdapter = createEntityAdapter<IProduct>({
    selectId: ({_id}: IProduct) => _id,
});
