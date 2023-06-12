import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterByProperty',
    pure: true,
})
export class FilterByPropertyPipe implements PipeTransform {
    transform<T, P extends keyof T>(
        value: T[] | null | undefined,
        propertyName: P,
        searchPropertyValue: T[P] | null | undefined,
    ): T[] | null {
        // если не передан массив
        if (!value) {
            return null;
        }

        const newValue = [...value]; // делаем копию

        if (typeof searchPropertyValue === 'string') {
            // если передана строчка
            return newValue.filter((item: T) =>
                (item[propertyName] as string)
                    .toLowerCase()
                    .includes(searchPropertyValue.toLowerCase()),
            );
        }

        // если другое значение
        return newValue.filter((item: T) => item[propertyName] === searchPropertyValue);
    }
}
