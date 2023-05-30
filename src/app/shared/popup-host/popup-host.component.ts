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
    @Input() popupContent!: TemplateRef<unknown>;

    @ViewChild('viewport', {read: ViewContainerRef, static: true})
    private readonly viewPortContainer!: ViewContainerRef;

    @Input() isOpen = false;

    close() {
        this.isOpen = false;
    }

    ngOnChanges({popupContent}: SimpleChanges): void {
        if (popupContent) {
            this.insertPopupContent();
        }
    }

    private insertPopupContent() {
        this.viewPortContainer.createEmbeddedView(this.popupContent);
    }
}
