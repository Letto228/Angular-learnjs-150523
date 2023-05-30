import {Component, Input, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent {
    @Input() set template(template: TemplateRef<unknown> | null) {
        this.insertTemplate(template);
    }

    @ViewChild('viewContainer', {read: ViewContainerRef, static: true})
    private readonly viewContainer!: ViewContainerRef;

    private insertTemplate(templateRef: TemplateRef<unknown> | null) {
        if (templateRef) {
            this.viewContainer.createEmbeddedView(templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}
