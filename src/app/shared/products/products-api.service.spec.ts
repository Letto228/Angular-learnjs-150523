import {TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {ProductsApiService} from './products-api.service';
import {productsMock} from './products.mock';

const mockHttpClient = {
    get(_url: string) {},
} as HttpClient;

describe('ProductsApiService', () => {
    let service: ProductsApiService;
    // let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ProductsApiService,
                {
                    provide: HttpClient,
                    useValue: mockHttpClient,
                },
            ],
            // imports: [HttpClientTestingModule],
        });
    });

    beforeEach(() => {
        service = TestBed.inject(ProductsApiService);

        spyOn(mockHttpClient, 'get').and.returnValue(of({data: {items: productsMock}}));
        // httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('Загрузка продуктов', done => {
        service.getProducts$().subscribe({
            next: products => {
                expect(products).toEqual(productsMock);
            },
            complete: done,
        });

        // httpTestingController.expectOne('/products').flush({data: {items: productsMock}});
    });
});
