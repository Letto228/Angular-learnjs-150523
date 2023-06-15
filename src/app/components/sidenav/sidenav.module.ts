import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {SidenavComponent} from './sidenav.component';
import {InsertShadowModule} from '../../shared/insert-shadow/insert-shadow.module';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { TestInterceptor } from '../../shared/base-url/test.interceptor';

@NgModule({
    declarations: [SidenavComponent],
    imports: [CommonModule, MatSidenavModule, MatListModule, InsertShadowModule],
    exports: [SidenavComponent],
    // providers: [
    //     {
    //         provide: HTTP_INTERCEPTORS,
    //         useClass: TestInterceptor,
    //         multi: true,
    //     },
    // ],
})
export class SidenavModule {}
