import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ICategory} from '../../../shared/categories/category.interface';
import {Router} from '@angular/router';
import {ISubCategory} from '../../../shared/categories/sub-category.interface';

@Component({
    selector: 'app-categories-select',
    templateUrl: './categories-select.component.html',
    styleUrls: ['./categories-select.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesSelectComponent {
    @Input() categories!: ICategory[] | null;

    constructor(private readonly Router: Router) {}

    navigate(id: ISubCategory['_id']): void {
        this.Router.navigate(['/products-list', id]);
    }
}
