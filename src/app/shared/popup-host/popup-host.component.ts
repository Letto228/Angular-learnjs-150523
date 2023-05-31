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
    @Input() template: TemplateRef<unknown> | null | undefined;

    @ViewChild('viewport', {read: ViewContainerRef, static: true})
    private readonly viewport!: ViewContainerRef;

    isVisible = false;

    ngOnChanges({template}: SimpleChanges): void {
        this.isVisible = template?.currentValue;

        if (this.isVisible) {
            this._insertTemplate();
        } else {
            this._clearViewPort();
        }
    }

    private _insertTemplate(): void {
        this._clearViewPort();
        this.viewport.createEmbeddedView(this.template!);
    }

    private _clearViewPort() {
        if (this.viewport.length) {
            this.viewport.clear();
        }
    }
}
