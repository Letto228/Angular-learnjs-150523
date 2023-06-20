import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {IProduct} from '../../shared/products/product.interface';
import {ProductsStoreService} from '../../shared/products/products-store.service';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit {
    readonly products$ = this.productsStoreService.products$;

    constructor(
        private readonly productsStoreService: ProductsStoreService,
        private readonly router: Router,
        @Inject('name') private readonly name: string,
    ) {
        // eslint-disable-next-line no-console
        console.log('ProductsListComponent', this.name);
    }

    ngOnInit(): void {
        this.productsStoreService.loadProducts();
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
}
