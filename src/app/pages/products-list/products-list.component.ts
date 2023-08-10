import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, filter, tap} from 'rxjs';
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

    readonly subCategoryId$ = this.activatedRoute.paramMap.pipe(
        map(paramMap => paramMap.get('id')),
        filter(Boolean),
        tap(subCategoryId => {
            this.productsStoreService.loadProducts(subCategoryId);
        }),
    );
    // обзервабле не работает, если не подписаться на нее.
    // как в таком случае изящней подписаться? я пока просто пихнула в хтмл:Р

    constructor(
        private readonly productsStoreService: ProductsStoreService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        @Inject('name') private readonly name: string,
    ) {
        // eslint-disable-next-line no-console
        // console.log('ProductsListComponent', this.name);
    }

    ngOnInit(): void {
        // eslint-disable-next-line dot-notation
        const subCategoryId = this.activatedRoute.snapshot.params['id'];

        this.productsStoreService.loadProducts(subCategoryId);

        // тут выходит дублирование, чтоб без id  тоже грузилось. видимо, так плохо?
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
