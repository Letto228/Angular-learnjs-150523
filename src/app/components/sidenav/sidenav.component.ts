import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import {Router} from '@angular/router';
import {CategoriesStoreService} from '../../shared/categories/categories-store.service';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent implements OnInit {
    readonly categories$ = this.categoriesStoreService.categories$;

    @ViewChild(MatDrawer, {static: true})
    private readonly matDrawerComponent!: MatDrawer;

    constructor(
        private readonly changeDetectorRef: ChangeDetectorRef,
        private readonly categoriesStoreService: CategoriesStoreService,
        private readonly router: Router,
    ) {}

    ngOnInit() {
        this.categoriesStoreService.loadCategories();
    }

    toggleSidenavOpened() {
        this.matDrawerComponent.toggle();
        this.changeDetectorRef.markForCheck();
    }

    navigateToSubCategory(subCategoryId: string): void {
        this.router.navigate(['/products-list/category', subCategoryId]);
    }
}
