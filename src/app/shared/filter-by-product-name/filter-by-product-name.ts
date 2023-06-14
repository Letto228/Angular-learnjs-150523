import {IProduct} from '../products/product.interface';

export function filterByProductName(items: IProduct[], searchProductName: string): IProduct[] {
    return items.filter(item => item.name.toLowerCase().includes(searchProductName.toLowerCase()));
}
