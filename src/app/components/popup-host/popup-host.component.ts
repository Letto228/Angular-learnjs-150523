import {ChangeDetectionStrategy, Component} from '@angular/core';
import {distinctUntilChanged} from 'rxjs';
import {PopupService} from '../../shared/popup/popup.service';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupHostComponent {
    popupData$ = this.popupService.popupStream$.pipe(
        distinctUntilChanged((prev, curr) => {
            return prev === curr || prev?.template === curr?.template;
        }),
    );

    constructor(private readonly popupService: PopupService) {}
}
