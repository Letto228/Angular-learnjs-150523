import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ISubCategory} from 'src/app/shared/categories/sub-category.interface';
import {ICategory} from '../../../shared/categories/category.interface';

@Component({
    selector: 'app-categories-select',
    templateUrl: './categories-select.component.html',
    styleUrls: ['./categories-select.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesSelectComponent {
    @Input() categories!: ICategory[] | null;
    @Output() subCategorySelected = new EventEmitter<string>();

    onSubCategorySelection(subCategory: ISubCategory): void {
        this.subCategorySelected.emit(subCategory._id);
    }
}
