import {NgModule, inject} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderModule} from './components/header/header.module';
import {ProductsListModule} from './pages/products-list/products-list.module';
import {SidenavModule} from './components/sidenav/sidenav.module';
import {PopupHostModule} from './components/popup-host/popup-host.module';
import {BaseUrlInterceptor} from './shared/base-url/base-url.interceptor';
import {ProductsStoreService} from './shared/products/products-store.service';
import {PopupService} from './shared/popup/popup.service';

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
        // ...SidenavModule.providers
        // ...PopupHostModule.providers
        // ProductsStoreService,
        {
            provide: 'ProductsStoreService',
            // useExisting: ProductsStoreService,
            // useFactory: (productsStoreService: ProductsStoreService) => productsStoreService,
            // deps: [ProductsStoreService],
            useFactory: () => inject(ProductsStoreService),
        },
        // ProductsApiService,
        // {
        //     provide: BASE_URL,
        //     useValue: baseUrl,
        // },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: BaseUrlInterceptor,
            multi: true,
        },
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: TestInterceptor,
        //     multi: true,
        // },
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: ErrorInterceptor,
        //     multi: true,
        // },
        // {
        //     provide: 'name',
        //     useValue: 'AppModule',
        // },
        PopupService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

/* eslint-disable prettier/prettier */

// NullInjector

// |

// PlatformInjector

// |

// RootInjector (AppModuleInjector)

// AppElementInjector

// |                                   \

// SidenavElemntInjector                HeaderElemntInjector

// |

// ProductsListElementInjector

/* eslint-enable prettier/prettier */
