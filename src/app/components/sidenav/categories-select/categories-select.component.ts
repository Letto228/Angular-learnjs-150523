import {ActivatedRoute, Router} from '@angular/router';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ICategory} from '../../../shared/categories/category.interface';
import {ProductsStoreService} from '../../../shared/products/products-store.service';

@Component({
    selector: 'app-categories-select',
    templateUrl: './categories-select.component.html',
    styleUrls: ['./categories-select.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesSelectComponent {
    @Input() categories!: ICategory[] | null;

    constructor(
        private readonly productsStoreService: ProductsStoreService,

        private readonly activatedRoute: ActivatedRoute,

        private readonly router: Router,
    ) {}

    subCategorySelected(_id: string) {
        this.productsStoreService.loadProducts(_id);

        this.navigateToTab(_id);
    }

    navigateToTab(_id: string) {
        this.router.navigate([`./products-list/${_id}`], {relativeTo: this.activatedRoute});

        // const urlTree = this.router.createUrlTree([`./${tab}`], {relativeTo: this.activatedRoute});

        // console.log(urlTree.toString(), urlTree);

        // this.router.navigateByUrl(urlTree);
    }
}
