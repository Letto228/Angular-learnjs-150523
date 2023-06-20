import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';
import {tap} from 'rxjs';
import {PopupService} from '../../shared/popup/popup.service';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupHostComponent {
    readonly templateContent$ = this.popupService.popupTemplate$.pipe(
        tap(templateOptions => {
            this.isEmpty = !templateOptions?.template;
        }),
    );

    constructor(private readonly popupService: PopupService) {}

    @HostBinding('class.empty')
    isEmpty = true;

    onPopupClose() {
        this.popupService.closePopup();
    }
}
