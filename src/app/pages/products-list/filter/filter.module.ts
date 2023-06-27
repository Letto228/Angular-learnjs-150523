import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {FilterComponent} from './filter.component';
import {CounterInputModule} from '../../../shared/counter-input/counter-input.module';
import {IsStringValidatorModule} from '../../../shared/test-validators/is-string/is-string-validator.module';
import {IsStringAsyncValidatorModule} from '../../../shared/test-validators/is-string-async/is-string-async-validator.module';

@NgModule({
    declarations: [FilterComponent],
    imports: [
        CommonModule,
        MatInputModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        CounterInputModule,
        ReactiveFormsModule,
        IsStringValidatorModule,
        IsStringAsyncValidatorModule,
        FormsModule,
        MatButtonModule,
    ],
    exports: [FilterComponent],
})
export class FilterModule {}
