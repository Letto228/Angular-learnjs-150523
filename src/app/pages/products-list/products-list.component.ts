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
    // readonly products$ = of(productsMock).pipe(delay(2000));

    // ls = new LocalStorageService();
    // private readonly productsStoreService = new ProductsStoreService(
    //     new ProductsApiService(
    //         new HttpService(
    //             this.ls,
    //         ),
    //         new ParamsService(
    //             this.ls,
    //         ),
    //     )
    // );

    // private readonly productsStoreService = inject(ProductsStoreService);
    readonly products$ = this.productsStoreService.products$;

    // products: IProduct[] | null = null;

    name = 'Мышь';

    propertyNameToFilter: keyof IProduct = 'feedbacksCount';

    searchProperty = '2';

    readonly propertyName = 'feedbacksCount' as const; // keyof IProduct
    searchPropertyValue = 2;

    constructor(
        // @Inject(ChangeDetectorRef) private readonly changeDetectorRef: ChangeDetectorRef,
        // private readonly changeDetectorRef: ChangeDetectorRef,
        // @Inject(ProductsStoreService) private readonly productsStoreService: ProductsStoreService,
        private readonly productsStoreService: ProductsStoreService, // @Inject('ProductsStoreServiceString') // private readonly productsStoreServiceString: ProductsStoreService, // @Inject('multiToken') // private readonly multiToken: string[],
    ) {
        // console.log(this.multiToken);
    }

    ngOnInit(): void {
        this.productsStoreService.loadProducts();
        //     this.products$.pipe().subscribe(products => {
        //         this.products = products;
        //         this.changeDetectorRef.markForCheck();
        //     });
        // setTimeout(() => {
        //     this.products = productsMock;
        //     this.changeDetectorRef.markForCheck();
        // }, 3000);
    }

    trackBy(_index: number, item: IProduct) {
        return item._id;
    }
}
