import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
} from '@angular/core';
import {IApplicationConfig} from '../../shared/application-config/application-config.interface';
import {PopupService} from '../../shared/popup/popup.service';
import {IPopupContext} from '../../shared/popup/popup.interface';

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

    openPopup(template: TemplateRef<unknown>): void {
        this.popupService.openPopup({
            template,
            context: this.getPopupContext(),
        });
    }

    closePopup(): void {
        this.popupService.closePopup();
    }

    getPopupContext(): IPopupContext {
        return {
            title: 'testTitle',
        };
    }
}
