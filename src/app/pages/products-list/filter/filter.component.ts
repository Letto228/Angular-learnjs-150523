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

    readonly filterForm = this.formBuilder.group({
        search: '',
        brands: this.formBuilder.array<boolean>([]),
        priceRange: this.formBuilder.group({
            min: 0,
            max: 99999,
        }),
    });

    constructor(private readonly formBuilder: FormBuilder) {}

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

    sendFilterData(): void {
        this.changeFilter.emit({
            name: this.filterForm.value.search || '',
            brands: this.filterForm.value!.brands?.length
                ? this.brands!.filter((value, i) => this.filterForm.value.brands![i])
                : [],
            priceRange: {
                min: this.filterForm.value.priceRange?.min || 0,
                max: this.filterForm.value.priceRange?.max || 0,
            },
        });
    }
}
