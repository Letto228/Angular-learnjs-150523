import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {Observable, delay, of} from 'rxjs';

export const isStringAsyncValidator: AsyncValidatorFn = (
    control: AbstractControl,
): Observable<ValidationErrors | null> => {
    const isString = !Number(control.value);

    return of(isString ? null : {isString: 'Is not string'}).pipe(delay(2000));
};
// export function isStringValidator(): ValidationErrors | null {
// const isString = !Number(control.value);

// return isString ? null : {isString: 'Is not string'};
// }
