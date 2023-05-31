import {Component, Input, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent {
    showPopup = false;

    @Input() set insertTemplate(template: TemplateRef<unknown> | null) {
        this.insertPopupContent(template);
    }

    @ViewChild('viewport', {read: ViewContainerRef, static: true})
    private readonly viewPortContainer!: ViewContainerRef;

    insertPopupContent(template: TemplateRef<unknown> | null) {
        this.viewPortContainer.clear();

        if (template) {
            this.showPopup = true;
            this.viewPortContainer.createEmbeddedView(template);
        } else {
            this.showPopup = false;
        }
    }

    close() {
        this.insertPopupContent(null);
    }
}
