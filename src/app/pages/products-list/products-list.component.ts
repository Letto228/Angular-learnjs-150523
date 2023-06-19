import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
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

    constructor(private readonly productsStoreService: ProductsStoreService) {}

    ngOnInit(): void {
        this.productsStoreService.loadProducts();
    }

    trackBy(_index: number, item: IProduct) {
        return item._id;
    }
}
