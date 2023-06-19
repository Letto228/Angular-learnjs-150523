import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    TemplateRef,
} from '@angular/core';
import {distinctUntilChanged} from 'rxjs';
import {PopupService} from '../../shared/popup/popup.service';
import {IPopupContext, IPopup} from '../../shared/popup/popup.interface';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupHostComponent {
    template: TemplateRef<unknown> | null = null;
    templateContext: IPopupContext | null = null;

    @HostBinding('class.empty')
    get isTemplateNullable() {
        return !this.template;
    }

    popupServiceSubscription = this.popupService.popupStream$
        .pipe(
            distinctUntilChanged((prev, curr) => {
                return prev === curr || prev?.template === curr?.template;
            }),
        )
        .subscribe((popupData: IPopup | null) => {
            this.template = popupData?.template || null;
            this.templateContext = popupData?.context || null;
            this.changeDetectorRef.markForCheck();
        });

    constructor(
        private readonly popupService: PopupService,
        private readonly changeDetectorRef: ChangeDetectorRef,
    ) {}
}
