import {map, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IProduct} from './product.interface';
import {IProductsDto} from './products.dto';
import {IProductDto} from './product.dto';

@Injectable({providedIn: 'root'})
export class ProductsApiService {
    constructor(
        // @Inject(BASE_URL) private readonly baseUrl: string,
        private readonly httpClient: HttpClient,
    ) {
        // eslint-disable-next-line no-console
        // console.log('ProductsApiService');
    }

    getProducts$(): Observable<IProduct[]> {
        return this.httpClient
            .get<IProductsDto>(`/products/suggestion`)
            .pipe(map(({data}) => data.items));
    }

    getProduct$(id: string): Observable<IProduct | undefined> {
        return this.httpClient.get<IProductDto>(`/products/${id}`).pipe(map(({data}) => data));
    }
}
