import {Pipe, PipeTransform} from '@angular/core';
import {currency} from './currency';

@Pipe({
    name: 'myCurrency',
    pure: true,
})
export class CurrencyPipe implements PipeTransform {
    transform(value: number | null | undefined, code: string, separator: string = ' '): string {
        return currency(value, code, separator);
    }
}
