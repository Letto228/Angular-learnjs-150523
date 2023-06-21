import {Subscription} from 'rxjs';
import {ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IProduct} from '../../shared/products/product.interface';
import {ProductsStoreService} from '../../shared/products/products-store.service';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit, OnDestroy {
    readonly products$ = this.productsStoreService.products$;

    subscription!: Subscription;
    subCat: string | null = null;

    constructor(
        private readonly productsStoreService: ProductsStoreService,
        private readonly router: Router,
        @Inject('name') private readonly name: string,
        private readonly activatedRoute: ActivatedRoute,
    ) {
        // eslint-disable-next-line no-console
        console.log('ProductsListComponent', this.name);
    }

    ngOnInit(): void {
        this.initializeListeners();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    trackBy(_index: number, item: IProduct) {
        return item._id;
    }

    navigateToProduct() {
        // this.router.navigate(['/product/id']);
        // this.router.navigate(['/product', 'id']);
        // this.router.navigateByUrl(['/product', 'id'].join('/'));
        this.router.navigateByUrl('/product/id');
    }

    initializeListeners() {
        this.subscription = this.activatedRoute.paramMap.subscribe(params => {
            this.subCat = params.get('subCat');
            this.productsStoreService.loadProducts(this.subCat);
        });
    }
}
