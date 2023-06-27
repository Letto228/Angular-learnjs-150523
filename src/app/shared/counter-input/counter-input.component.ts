import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'app-counter-input',
    templateUrl: './counter-input.component.html',
    styleUrls: ['./counter-input.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            // eslint-disable-next-line no-use-before-define
            useExisting: CounterInputComponent,
            multi: true,
        },
    ],
})
export class CounterInputComponent implements ControlValueAccessor {
    @Input() step = 1;

    counter = 0;
    isDisabled = false;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private onChange: (value: number) => void = () => {};
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private onTouch: () => void = () => {};

    constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

    back() {
        this.counter -= this.step;

        this.onTouch();
        this.onChange(this.counter);
    }

    next() {
        this.counter += this.step;

        this.onTouch();
        this.onChange(this.counter);
    }

    writeValue(value: number) {
        this.counter = value;

        this.changeDetectorRef.markForCheck();
    }

    // cb ~ (value: number) => {this.store = value}
    // cb ~ (value: number) => {this.contol.setValue(value)}
    registerOnChange(cb: (value: number) => void) {
        this.onChange = cb;
    }

    registerOnTouched(cb: () => void) {
        this.onTouch = cb;
    }

    setDisabledState(isDisabled: boolean) {
        this.isDisabled = isDisabled;

        this.changeDetectorRef.markForCheck();
    }
}
