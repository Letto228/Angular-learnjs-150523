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

    @ViewChild('popupContent', {read: ViewContainerRef, static: true})
    private readonly popUpContent!: ViewContainerRef;

    hide = true;

    ngOnChanges({template}: SimpleChanges): void {
        template.currentValue ? this.showPopup() : this.closePopup();
    }

    private showPopup() {
        this.hide = false;
        this.popUpContent.clear();
        this.popUpContent.createEmbeddedView(this.template as TemplateRef<unknown>);
    }

    private closePopup() {
        this.hide = true;
        this.popUpContent.clear();
    }
}
