import {Component, Input, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent {
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    showPopup: boolean = false;

    @Input() set popupTemplate(template: TemplateRef<unknown> | null) {
        this.handleTemplate(template);
    }

    @ViewChild('popupContainer', {read: ViewContainerRef, static: true})
    private readonly popupContainer!: ViewContainerRef;

    private handleTemplate(template: TemplateRef<unknown> | null = null): void {
        this.popupContainer.clear();

        if (template) {
            this.popupContainer.createEmbeddedView(template);
        }

        this.showPopup = !!template;
    }
}
