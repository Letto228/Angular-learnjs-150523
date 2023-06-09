import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterByValue',
})
export class FilterByValuePipe implements PipeTransform {
    transform<T>(
        array: T[] | undefined,
        searchProductName: unknown,
        value: unknown,
    ): T[] | undefined {
        if (array?.length) {
            if (searchProductName instanceof String) {
                return array.filter(element =>
                    String(element[searchProductName as keyof T]).startsWith(String(value)),
                );
            }

            return array.filter(element => element[searchProductName as keyof T] === value);
        }

        return array;
    }
}
