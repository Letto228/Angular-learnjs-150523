import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderModule} from './components/header/header.module';
import {SidenavModule} from './components/sidenav/sidenav.module';
import {PopupHostModule} from './components/popup-host/popup-host.module';
import {BaseUrlInterceptor} from './shared/base-url/base-url.interceptor';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HeaderModule,
        SidenavModule,
        PopupHostModule,
        HttpClientModule,
    ],
    providers: [
        {
            provide: 'name',
            useValue: 'AppModule',
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: BaseUrlInterceptor,
            multi: true,
        },
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

// |                                   \

// ProductsListModuleInjector           ProductModuleInjector

// AppElementInjector

// |                                                \

// SidenavElemntInjector                            HeaderElemntInjector

// |                                \

// ProductsListElementInjector       ProductElementInjector

/* eslint-enable prettier/prettier */
