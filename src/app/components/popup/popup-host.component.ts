import {
    Component,
    Input,
    OnChanges,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent implements OnChanges {
    @Input() template!: TemplateRef<unknown>;

    @ViewChild('viewPort', {read: ViewContainerRef, static: true})
    private readonly viewPort!: ViewContainerRef;

    ngOnChanges(template: SimpleChanges): void {
        if (template) {
            this.insertRefTemplate();
        }
    }

    private insertRefTemplate() {
        this.viewPort.clear();
        this.viewPort.createEmbeddedView(this.template);
    }
}
