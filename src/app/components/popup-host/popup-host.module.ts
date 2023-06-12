import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PopupHostComponent} from './popup-host.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
    declarations: [PopupHostComponent],
    imports: [CommonModule, MatDialogModule],
    exports: [PopupHostComponent],
})
export class PopupHostModule {}
