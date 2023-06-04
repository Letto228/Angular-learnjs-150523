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
    @Input()
    template!: TemplateRef<unknown> | null;

    @ViewChild('viewport', {read: ViewContainerRef, static: false})
    private readonly viewport!: ViewContainerRef;

    isVisible = false;

    ngOnChanges({template}: SimpleChanges) {
        this.isVisible = template.currentValue;

        if (this.isVisible) {
            this._insertTemplate();
        }
    }

    private _insertTemplate() {
        this._clearViewPort();
        this.viewport.createEmbeddedView(this.template!);
    }

    private _clearViewPort() {
        this.viewport.clear();
        // eslint-disable-next-line no-console
        console.log(this.viewport);
    }
}
