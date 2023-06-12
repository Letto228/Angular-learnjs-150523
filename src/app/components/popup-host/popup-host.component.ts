import {Component, Input, TemplateRef} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent {
    @Input() set template(template: TemplateRef<unknown> | null) {
        if (template) {
            this.openDialog(template);

            return;
        }

        this.dialog.ngOnDestroy();
    }

    constructor(public dialog: MatDialog) {}

    openDialog(template: TemplateRef<unknown>): void {
        this.dialog.ngOnDestroy();
        this.dialog.open(template);
    }
}
