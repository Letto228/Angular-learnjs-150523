import {ChangeDetectionStrategy, Component, HostBinding, Input, TemplateRef} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {PopupContent, PopupService} from '../../shared/services/popup.service';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupHostComponent {
    @Input() template: TemplateRef<unknown> | null = null;

    @HostBinding('class.empty')
    isEmpty = true;

    content$: Observable<PopupContent<object> | null>;

    constructor(private readonly popupService: PopupService) {
        this.content$ = this.popupService.popupTemplate$.asObservable().pipe(
            tap(context => {
                this.isEmpty = !context?.template;
            }),
        );
    }

    closePopup() {
        this.popupService.closePopup();
    }
}
