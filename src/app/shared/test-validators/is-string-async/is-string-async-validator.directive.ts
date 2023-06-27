import {ChangeDetectorRef, Directive} from '@angular/core';
import {
    AbstractControl,
    AsyncValidator,
    NG_ASYNC_VALIDATORS,
    ValidationErrors,
} from '@angular/forms';
import {Observable, delay, of, tap} from 'rxjs';
import {isStringValidator} from '../is-string/is-string.validator';

@Directive({
    selector: '[appIsStringAsyncValidator]',
    providers: [
        {
            provide: NG_ASYNC_VALIDATORS,
            multi: true,
            // eslint-disable-next-line no-use-before-define
            useExisting: IsStringAsyncValidatorDirective,
        },
    ],
    exportAs: 'appIsStringAsyncValidator',
})
export class IsStringAsyncValidatorDirective implements AsyncValidator {
    constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        // const error$ = this.errorService.checkSearchValue$(control.value);
        const error$ = of(isStringValidator(control)).pipe(delay(2000));

        return error$.pipe(
            tap(() => {
                this.changeDetectorRef.markForCheck();
            }),
        );
    }
}
