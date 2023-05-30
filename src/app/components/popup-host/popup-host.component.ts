import {Component, Input, TemplateRef, ViewChild, ViewContainerRef, OnChanges} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: 'popup-host.component.html',
    styleUrls: ['popup-host.component.css'],
})
export class PopupHostComponent implements OnChanges {
    @Input() template!: TemplateRef<unknown> | null;
    @ViewChild('ViewPort', {read: ViewContainerRef, static: true})
    private readonly ViewPort!: ViewContainerRef;

    ngOnChanges(): void {
        this.template ? this.ViewPort.createEmbeddedView(this.template) : this.ViewPort.clear();
    }
}
