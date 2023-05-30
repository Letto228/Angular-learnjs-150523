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
    // Получаем любой темплейт при объявлении компонента
    @Input() template: TemplateRef<unknown> | null = null;

    // Готовим контейнер для вставки темплейта пришедшего из @Input
    @ViewChild('viewport', {read: ViewContainerRef, static: true})
    private readonly viewPortContainer!: ViewContainerRef;

    readonly isViewContainerClear: boolean = true;

    ngOnChanges({template}: SimpleChanges) {
        if (template) {
            this.updatePopupContainer(this.template);
        }
    }

    private updatePopupContainer(template: TemplateRef<unknown> | null) {
        // Очищаем контейнер если ничего не пришло.
        if (!this.isViewContainerClear) {
            this.viewPortContainer.clear();
        }

        // Собственно создание шаблона.
        if (template) {
            this.viewPortContainer.createEmbeddedView(template);
        }

        (this.isViewContainerClear as boolean) = !this.viewPortContainer.length;
    }
}
