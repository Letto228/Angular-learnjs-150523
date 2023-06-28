import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {map, takeUntil} from 'rxjs';
import {IProductsFilter} from './products-filter.interface';
import {DestroyService} from '../../../shared/destroy/destroy.service';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class FilterComponent implements OnChanges, OnInit {
    @Input() brands: string[] | null = null;
    @Input() initialFilter!: IProductsFilter;

    @Output() changeFilter = new EventEmitter<IProductsFilter>();
    // Output by stream
    // @Output() readonly changeFilter: Observable<IProductsFilter>;

    readonly filterForm = this.formBuilder.group({
        search: '',
        brands: this.formBuilder.array<boolean>([]),
        priceRange: this.formBuilder.group({
            min: 0,
            max: 99999,
        }),
    });

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly destroy$: DestroyService,
    ) {
        // Необходимо делать это в конструкторе, т.к. при создании потока нужна уже созданная форма (filterForm)
        // this.changeFilter = this.getFilterStream$();
    }

    ngOnChanges({brands}: SimpleChanges) {
        if (brands) {
            this.initBrandsForm();
        }
    }

    ngOnInit() {
        this.initFilterValue();
        this.listenFilterChange();
    }

    private initBrandsForm() {
        const initialFilterBrands = this.initialFilter.brands;
        const brandsControl: boolean[] = this.brands
            ? this.brands.map(name => initialFilterBrands.includes(name))
            : ([] as boolean[]);

        const brandsForm = this.formBuilder.array(brandsControl);

        this.filterForm.setControl('brands', brandsForm);
    }

    private initFilterValue() {
        const {name, priceRange} = this.initialFilter;

        this.filterForm.patchValue({search: name, priceRange});
    }

    private listenFilterChange() {
        this.filterForm.valueChanges
            .pipe(
                map(
                    ({brands, search, ...otherValues}) =>
                        ({
                            ...otherValues,
                            name: search,
                            brands: this.getBrandsListFromForm(brands as boolean[]),
                        } as IProductsFilter),
                ),
                takeUntil(this.destroy$),
            )
            .subscribe(filter => {
                this.changeFilter.emit(filter);
            });
    }

    // Output by stream
    // private getFilterStream$(): Observable<IProductsFilter> {
    //     return this.filterForm.valueChanges.pipe(
    //         map(
    //             ({brands, search, ...otherValues}) =>
    //                 ({
    //                     ...otherValues,
    //                     name: search,
    //                     brands: this.getBrandsListFromForm(brands as boolean[]),
    //                 } as IProductsFilter),
    //         ),
    //     );
    // }

    private getBrandsListFromForm(brandsFormValue: boolean[]): IProductsFilter['brands'] {
        return !this.brands ? [] : this.brands.filter((_, index) => brandsFormValue[index]);
    }
}
