import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterByProperty',
})
export class FilterByPropertyPipe implements PipeTransform {
    transform<T, K extends keyof T>(
        value: T[] | undefined | null,
        propertyName: K,
        searchPropertyValue: T[K],
    ): T[] | null {
        if (!value) {
            return null;
        }

        if (typeof searchPropertyValue === 'string') {
            return value.filter(item =>
                (item[propertyName] as string)
                    .toLowerCase()
                    .includes(searchPropertyValue.toLowerCase()),
            );
        }

        return value.filter(item => item[propertyName] === searchPropertyValue);
    }
}
