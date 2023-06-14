import {Pipe, PipeTransform} from '@angular/core';
import {filterByProperty} from './filter-by-property';

@Pipe({
    name: 'filterByProperty',
})
export class FilterByPropertyPipe implements PipeTransform {
    transform<T, K extends keyof T>(
        items: T[] | null | undefined,
        PropertyName: K,
        SearchPropertyValue: T[K],
    ): T[] | undefined | null {
        if (items && items?.length) {
            return filterByProperty(items, PropertyName, SearchPropertyValue);
        }

        return items;
    }
}
