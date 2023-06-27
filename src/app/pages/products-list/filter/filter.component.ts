import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {IProductsFilter} from './products-filter.interface';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnChanges {
    @Input() brands: string[] | null = null;

    @Output() changeFilter = new EventEmitter<IProductsFilter>();

    // readonly filterForm = new FormGroup({
    //     search: new FormControl(''),
    //     brands: new FormArray<FormControl<boolean>>([]),
    //     priceRange: new FormGroup({
    //         min: new FormControl(0),
    //         max: new FormControl(99999),
    //     }),
    // });
    readonly filterForm = this.formBuilder.group({
        search: [
            {value: '', disabled: true},
            {validators: [Validators.required]},
        ] as unknown as string,
        brands: this.formBuilder.array<boolean>([]),
        priceRange: this.formBuilder.group({
            min: 0,
            max: 99999,
        }),
    });

    constructor(private readonly formBuilder: FormBuilder) {
        // this.filterForm.get('priceRange')?.get('min');
        // eslint-disable-next-line no-console
        this.filterForm.valueChanges.subscribe(console.log);

        setTimeout(() => {
            this.filterForm.get('search')?.enable();
            // this.filterForm.setValue({
            //     search: '32',
            //     brands: [],
            //     priceRange: {
            //         min: 10,
            //         max: 300,
            //     },
            // });
            this.filterForm.patchValue({
                search: '32',
                priceRange: {
                    max: 300,
                },
            });
            this.filterForm.get('priceRange')?.get('min')?.disable();
        }, 2000);
    }

    ngOnChanges({brands}: SimpleChanges): void {
        if (brands) {
            this.initBrandsForm();
        }
    }

    private initBrandsForm() {
        // const brandsControl: Array<FormControl<boolean>> = this.brands
        //     ? (this.brands.map(() => new FormControl<boolean>(false)) as Array<
        //           FormControl<boolean>
        //       >)
        //     : ([] as Array<FormControl<boolean>>);
        const brandsControl: boolean[] = this.brands
            ? this.brands.map(() => false)
            : ([] as boolean[]);

        const brandsForm = this.formBuilder.array(brandsControl);

        this.filterForm.setControl('brands', brandsForm);
    }

    log(value: unknown) {
        // eslint-disable-next-line no-console
        console.log(value);
    }

    // readonly isStringAsyncValidator = (control: AbstractControl) => {
    //     // eslint-disable-next-line no-console
    //     console.log('isStringAsyncValidator');

    //     return this.isStringAsync(control);
    // };

    // textControl = new FormControl('', {
    //     validators: [Validators.minLength(3), Validators.required],
    //     // asyncValidators: [this.isStringAsync.bind(this)],
    //     asyncValidators: [
    //         this.isStringAsyncValidator,
    //         (control: AbstractControl) => {
    //             // eslint-disable-next-line no-console
    //             console.log('test');

    //             return this.isStringAsync(control).pipe(map(() => ({test: 'test error'})));
    //         },
    //     ],
    // });

    // textControlErrors$ = this.textControl.statusChanges.pipe(
    //     map(status => (status === 'INVALID' ? this.textControl.errors : null)),
    //     startWith(this.textControl.errors),
    // );

    // text = '';

    // private isStringAsync(control: AbstractControl): Observable<ValidationErrors | null> {
    //     // const error$ = this.errorService.checkSearchValue$(control.value);
    //     const error$ = of(isStringValidator(control)).pipe(delay(2000));

    //     return error$;
    // }
}
