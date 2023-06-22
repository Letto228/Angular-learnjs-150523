import {Injectable} from '@angular/core';
import {Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Observable, delay, filter} from 'rxjs';
import {IProduct} from '../products/product.interface';
import {ProductsStoreService} from '../products/products-store.service';

@Injectable({
    providedIn: 'root',
})
export class ProductsResolver implements Resolve<IProduct[]> {
    constructor(private readonly productsStoreService: ProductsStoreService) {}

    resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<IProduct[]> {
        this.productsStoreService.loadProducts();

        return this.productsStoreService.products$.pipe(filter(Boolean), delay(5000));
    }
}
