import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {SidenavComponent} from './sidenav.component';
import {InsertShadowModule} from '../../shared/insert-shadow/insert-shadow.module';

@NgModule({
    declarations: [SidenavComponent],
    imports: [CommonModule, MatSidenavModule, MatListModule, InsertShadowModule],
    exports: [SidenavComponent],
})
export class SidenavModule {}
