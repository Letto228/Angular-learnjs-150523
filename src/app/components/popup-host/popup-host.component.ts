import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';
import {distinctUntilChanged, tap} from 'rxjs';
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
        tap(popupData => {
            this.isEmpty = !popupData?.template;
        }),
    );

    @HostBinding('class.empty') isEmpty = true;

    constructor(private readonly popupService: PopupService) {}
}
