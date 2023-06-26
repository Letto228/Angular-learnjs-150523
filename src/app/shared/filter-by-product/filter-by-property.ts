import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'filterByProperty'})
export class FilterByProperty implements PipeTransform {
    transform<T, P extends keyof T>(
        items: T[] | undefined | null,
        categoryName: P,
        value: T[P],
    ): T[] | undefined | null {
        if (!items?.length) {
            return items;
        }

        if (this.checkString(value)) {
            const valueUpperCase = value.toUpperCase();

            return items.filter(item =>
                (item[categoryName] as string).toUpperCase().includes(valueUpperCase),
            );
        }

        return items.filter(item => item[categoryName] === value);
    }

    checkString(item: any): item is string {
        return typeof item === 'string';
    }
}
