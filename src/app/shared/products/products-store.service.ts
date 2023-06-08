import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {IProduct} from './product.interface';
import {ProductsApiService} from './products-api.service';

@Injectable()
export class ProductsStoreService {
    private readonly productsStore$ = new BehaviorSubject<IProduct[] | null>(null);

    get products$(): Observable<IProduct[] | null> {
        return this.productsStore$.asObservable();
    }

    constructor(private readonly productsApiService: ProductsApiService) {}

    loadProducts() {
        this.productsApiService.getProducts$().subscribe(products => {
            this.productsStore$.next(products);
        });
        // setTimeout(() => {
        //     this.productsStore$.next(productsMock);
        // }, 2000);
    }
}
