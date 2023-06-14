import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterByProperty',
})
export class FilterProductsPipe implements PipeTransform {
    transform<T, P extends keyof T>(data: T[], propertyName: P, filteredValue: T[P]): T[] {
        return [...data].filter((item: T) => {
            if (typeof item[propertyName] === 'string') {
                return (item[propertyName] as string)
                    .toLowerCase()
                    .includes((filteredValue as string).toLowerCase());
            }

            return item[propertyName] === filteredValue;
        });
    }
}
