import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'filterByProduct'})
export class FilterByProductPipe implements PipeTransform {
    transform<T, P extends keyof T>(
        items: T[] | undefined | null,
        categoryName: P,
        value: T[P],
    ): T[] | undefined | null {
        if (!items?.length) {
            return items;
        }

        if (typeof categoryName === 'string') {
            const valueUpperCase = (value as string).toUpperCase();

            return items.filter(item =>
                (item[categoryName] as string).toUpperCase().includes(valueUpperCase),
            );
        }

        return items.filter(item => item[categoryName] === value);
    }
}
