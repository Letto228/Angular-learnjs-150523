import {Pipe, PipeTransform} from '@angular/core';
import {IProduct} from '../products/product.interface';

@Pipe({name: 'filterByProduct'})
export class FilterByProductPipe implements PipeTransform {
    transform(
        value: IProduct[] | undefined | null,
        searchProductName: string,
    ): IProduct[] | undefined | null {
        if (!value?.length || !searchProductName) {
            return value;
        }

        const upperCase: string = searchProductName.toUpperCase();

        return value.filter(item => item.name.toLocaleUpperCase().includes(upperCase));
    }
}
