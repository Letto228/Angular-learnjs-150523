import {FormControl} from '@angular/forms';
import {IsStringValidatorDirective} from './is-string-validator.directive';

describe('IsStringValidatorDirective', () => {
    it('should create an instance', () => {
        const directive = new IsStringValidatorDirective();

        expect(directive).toBeTruthy();
    });

    it('Форма с числом', () => {
        const directive = new IsStringValidatorDirective();

        const error = directive.validate(new FormControl('20000'));

        expect(error).toEqual({isString: 'Is not string'});
    });

    it('Форма без числа', () => {
        const directive = new IsStringValidatorDirective();

        const error = directive.validate(new FormControl('String 1'));

        expect(error).toEqual(null);
    });
});
