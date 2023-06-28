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
import {ActivatedRoute, Router} from '@angular/router';
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

    queryParams = this.activatedRoute.snapshot.queryParams;

    readonly filterForm = this.formBuilder.group({
        search: this.queryParams['name'] || '',
        brands: this.formBuilder.array<boolean>([]),
        priceRange: this.formBuilder.group({
            min: Number(this.queryParams['priceRangeMin']) || 1,
            max: Number(this.queryParams['priceRangeMax']) || 99999,
        }),
    });

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
    ) {}

    ngOnChanges({brands}: SimpleChanges): void {
        if (brands) {
            this.initBrandsForm();
        }
    }

    private initBrandsForm() {
        const queryBrands = this.queryParams['brands'] || [];
        const brandsControl: boolean[] = this.brands
            ? this.brands.map(value => queryBrands.includes(value))
            : ([] as boolean[]);

        const brandsForm = this.formBuilder.array(brandsControl);

        this.filterForm.setControl('brands', brandsForm);
    }

    applyFilter(): void {
        const filterValues = this.filterForm.value;
        const choosenBrands = filterValues.brands || [];

        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: {
                name: filterValues.search || '',
                brands: this.brands ? this.brands.filter((value, i) => choosenBrands[i]) : [],
                priceRangeMin: filterValues.priceRange?.min || 0,
                priceRangeMax: filterValues.priceRange?.max || 0,
            },
        });
    }
}
