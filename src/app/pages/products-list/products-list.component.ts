import {
    ChangeDetectionStrategy,
    Component,
    Host,
    Inject,
    OnInit,
    Self,
    SkipSelf,
    Optional,
    inject,
} from '@angular/core';
import {IProduct} from '../../shared/products/product.interface';
import {ProductsStoreService} from '../../shared/products/products-store.service';
import {BASE_URL} from '../../shared/base-url/base-url.token';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: 'name',
            useValue: 'ProductsListComponent',
        },
    ],
})
export class ProductsListComponent implements OnInit {
    private readonly productsStoreService = inject(ProductsStoreService);

    readonly products$ = this.productsStoreService.products$;

    constructor(
        // private readonly productsStoreService: ProductsStoreService, // @Inject(HTTP_INTERCEPTORS) private readonly inter: unknown[],
        @Inject('ProductsStoreService')
        @Optional()
        private readonly productsStoreServiceCopy: ProductsStoreService,
        @Inject('name') @Optional() @Self() private readonly name: string,
        @Inject('name') @Optional() @SkipSelf() private readonly parentsName: string,
        @Inject('name') @Optional() @Host() @SkipSelf() private readonly hostName: string,
    ) {
        // eslint-disable-next-line no-console
        console.log('----------- Self', this.name);
        // eslint-disable-next-line no-console
        console.log('----------- Parents', this.parentsName);
        // eslint-disable-next-line no-console
        console.log('----------- Host', this.hostName);

        // eslint-disable-next-line no-console
        console.log(this.productsStoreServiceCopy === this.productsStoreService);
        // eslint-disable-next-line no-console
        console.log(inject(BASE_URL));
    }

    ngOnInit(): void {
        this.productsStoreService.loadProducts();
    }

    trackBy(_index: number, item: IProduct) {
        return item._id;
    }
}
