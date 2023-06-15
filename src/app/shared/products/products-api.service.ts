import {map, Observable} from 'rxjs';
import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IProduct} from './product.interface';
import {BASE_URL} from '../base-url/base-url.token';
import {IProductsDto} from './products.dto';

@Injectable()
export class ProductsApiService {
    constructor(
        @Inject(BASE_URL) private readonly baseUrl: string,
        private readonly httpClient: HttpClient,
    ) {}

    getProducts$(): Observable<IProduct[]> {
        return this.httpClient
            .get<IProductsDto>(`${this.baseUrl}/products/suggestion`)
            .pipe(map(({data}) => data.items));
    }
}
