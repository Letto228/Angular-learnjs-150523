import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export const isStringValidator: ValidatorFn = (
    control: AbstractControl,
): ValidationErrors | null => {
    const isString = !Number(control.value);

    return isString ? null : {isString: 'Is not string'};
};
// export function isStringValidator(): ValidationErrors | null {
// const isString = !Number(control.value);

// return isString ? null : {isString: 'Is not string'};
// }
