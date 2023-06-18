import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
} from '@angular/core';
import {IApplicationConfig} from '../../shared/application-config/application-config.interface';
import {PopupService} from '../popup-host/popup.service';
import {ITemplateContext} from '../popup-host/popup-interfaces';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    @Input() applicationConfig: IApplicationConfig | null = null;

    @Output() menuClickOutput = new EventEmitter<void>();

    constructor(private readonly popupService: PopupService) {}

    openPopup(_template: TemplateRef<ITemplateContext>) {
        const context = {$implicit: 'the title'};

        this.popupService.openPopup(_template, context);
    }

    closePopup() {
        this.popupService.closePopup();
    }
}
