import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderModule} from './components/header/header.module';
import {ProductsListModule} from './pages/products-list/products-list.module';
import {SidenavModule} from './components/sidenav/sidenav.module';
import {PopupHostModule} from './components/popup-host/popup-host.module';
import {ProductsStoreService} from './shared/products/products-store.service';
import {ProductsApiService} from './shared/products/products-api.service';
import {baseUrl} from './shared/base-url/base-url.const';
import {BASE_URL} from './shared/base-url/base-url.token';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HeaderModule,
        ProductsListModule,
        SidenavModule,
        PopupHostModule,
        HttpClientModule,
    ],
    providers: [
        // ...HttpClientModule.providers,
        // {
        //     provide: ProductsStoreService, // token
        //     useClass: ProductsStoreService, // value: new ProductsStoreService();
        // },
        ProductsStoreService,
        ProductsApiService,
        {
            provide: BASE_URL,
            useValue: baseUrl,
        },
        // {
        //     provide: 'name',
        //     useValue: 'Alesha',
        // },
        // {
        //     provide: 'ProductsStoreServiceString', // псевдоним для ProductsStoreService
        //     useExisting: ProductsStoreService, // value: inject(ProductsStoreService)
        // },
        // {
        //     provide: 'useClass',
        //     useFactory: () => new ProductsStoreService(),
        // },
        // {
        //     provide: 'useValue',
        //     useFactory: () => 'Alesha',
        // },
        // {
        //     provide: 'useExisting',
        //     useFactory: (productsStoreServiceString: ProductsStoreService) =>
        //         productsStoreServiceString,
        //     deps: ['ProductsStoreServiceString'],
        // },
        // {
        //     provide: 'multiToken',
        //     useValue: 'first',
        //     multi: true,
        // },
        // {
        //     provide: 'multiToken',
        //     useValue: 'last',
        //     multi: true,
        // },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
