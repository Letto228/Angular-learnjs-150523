import {Pipe, PipeTransform} from '@angular/core';
import {currency} from './currency';

@Pipe({
    name: 'myCurrency',
    pure: true,
})
export class CurrencyPipe implements PipeTransform {
    transform(value: number | null | undefined, code: string, separator: string = ' '): string {
        // eslint-disable-next-line no-console
        console.log('From pipe', value);

        return currency(value, code, separator);
    }
}
