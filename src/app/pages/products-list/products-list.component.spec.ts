import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {of, take} from 'rxjs';
import {MemoizedSelector} from '@ngrx/store';
import {ProductsListComponent} from './products-list.component';
import {ProductsListModule} from './products-list.module';
import {BrandsService} from '../../shared/brands/brands.service';
import {productsMock} from '../../shared/products/products.mock';
import {productsSelector} from '../../store/products/products.selectors';
import {IState} from '../../store/reducer';
import {IProduct} from '../../shared/products/product.interface';
import {loadProducts} from '../../store/products/products.actions';

describe('ProductsListComponent', () => {
    let component: ProductsListComponent;
    let fixture: ComponentFixture<ProductsListComponent>;
    let mockStore: MockStore;
    let dispatchSpy: jasmine.Spy;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProductsListModule, RouterTestingModule, BrowserAnimationsModule],
            providers: [
                {
                    provide: BrandsService,
                    useValue: {
                        brands$: of([]),
                        loadBrands(_subCategoryId?: string | null) {},
                    },
                },
                provideMockStore(),
            ],
        }).compileComponents();

        mockStore = TestBed.inject(MockStore);

        dispatchSpy = spyOn(mockStore, 'dispatch');

        mockStore.overrideSelector(
            productsSelector as MemoizedSelector<IState, IProduct[]>,
            productsMock,
        );

        fixture = TestBed.createComponent(ProductsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Загрузка данных', done => {
        expect(dispatchSpy).toHaveBeenCalledWith(loadProducts(null));

        component.products$.pipe(take(1)).subscribe({
            next: products => {
                expect(products).toEqual(productsMock);
            },
            complete: done,
        });
    });
});
