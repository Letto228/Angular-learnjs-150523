import {Directive} from '@angular/core';
import {NG_VALIDATORS, Validator} from '@angular/forms';
import {isStringValidator} from './is-string.validator';

@Directive({
    selector: '[appIsStringValidator]',
    providers: [
        {
            provide: NG_VALIDATORS,
            multi: true,
            // eslint-disable-next-line no-use-before-define
            useExisting: IsStringValidatorDirective,
        },
    ],
    exportAs: 'appIsStringValidator',
})
export class IsStringValidatorDirective implements Validator {
    readonly validate = isStringValidator;
    // validate(control: AbstractControl): ValidationErrors | null {
    //     return isStringValidator(control);
    // }
}
