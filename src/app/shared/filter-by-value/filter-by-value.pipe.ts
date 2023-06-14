import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterByValue',
})
export class FilterByValuePipe implements PipeTransform {
    transform<T, P extends keyof T>(
        array: T[] | undefined | null,
        searchValue: P,
        value: T[P] | null,
    ): T[] | undefined | null {
        if (!array?.length) {
            return array;
        }

        if (typeof value === 'string') {
            return array.filter(element => String(element[searchValue]).startsWith(String(value)));
        }

        return array.filter(element => element[searchValue] === value);
    }
}
