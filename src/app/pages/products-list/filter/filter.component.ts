import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {IProductsFilter} from './products-filter.interface';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnChanges {
    @Input() brands: string[] | null = null;
    // вариант 2
    @Output() changeFilter = new EventEmitter<IProductsFilter>();
    sendForm() {
        if (this.filterForm) {
            this.changeFilter.emit({
                name: this.filterForm.value.search ? this.filterForm.value.search : '',
                brands: [],
                priceRange: {
                    min: this.filterForm.value.priceRange?.min
                        ? this.filterForm.value.priceRange?.min
                        : 1,
                    max: this.filterForm.value.priceRange?.max
                        ? this.filterForm.value.priceRange?.max
                        : 9999,
                },
            });
        }
    }

    // вариант 1
    // @HostListener('keyup', ['$event.target.value'])
    // onClick(value: string | null) {
    //     value?.length === 0 ? this.setQueryparams(null) : this.setQueryparams(value);
    // }

    // setQueryparams(param: string | null) {
    //     this.router.navigate(['products-list'], {
    //         queryParams: {
    //             search: param,
    //         },
    //     });
    // }

    readonly filterForm = this.formBuilder.group({
        search: '',
        brands: this.formBuilder.array<boolean>([]),
        priceRange: this.formBuilder.group({
            min: 0,
            max: 99999,
        }),
    });

    constructor(private readonly formBuilder: FormBuilder, private readonly router: Router) {}

    ngOnChanges({brands}: SimpleChanges): void {
        if (brands) {
            this.initBrandsForm();
        }
    }

    private initBrandsForm() {
        const brandsControl: boolean[] = this.brands
            ? this.brands.map(() => false)
            : ([] as boolean[]);

        const brandsForm = this.formBuilder.array(brandsControl);

        this.filterForm.setControl('brands', brandsForm);
    }
}
