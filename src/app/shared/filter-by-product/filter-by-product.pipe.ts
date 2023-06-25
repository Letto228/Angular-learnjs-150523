import {Pipe, PipeTransform} from '@angular/core';
import {filterProduct} from './filter-by-product';

@Pipe({name: 'filterByProduct'})
export class FilterByProductPipe implements PipeTransform {
    transform(value: number | undefined | null, separator: string = '_'): string {
        return filterProduct(value, separator);
    }
}
