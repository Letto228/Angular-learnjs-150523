import {Pipe, PipeTransform} from '@angular/core';
import {IProduct} from '../products/product.interface';
import {filterByProductName} from './filter-by-product-name';

@Pipe({
    name: 'filteredByProductName',
})
export class FilterByProductNamePipe implements PipeTransform {
    transform(
        items: IProduct[] | undefined | null,
        searchProductName: string,
    ): IProduct[] | undefined | null {
        if (items && items.length) {
            return filterByProductName(items, searchProductName);
        }

        return items;
    }
}
