import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    OnInit,
    TemplateRef,
} from '@angular/core';
import {PopupService} from './popup.service';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupHostComponent implements OnInit {
    template: TemplateRef<unknown> | null = null;

    constructor(
        private readonly popupService: PopupService,
        private readonly cd: ChangeDetectorRef,
    ) {}

    @HostBinding('class.empty')
    get isTemplateNullable() {
        return !this.template;
    }

    ngOnInit(): void {
        this.subscribeForTemplateUpdates();
    }

    closePopup(): void {
        this.popupService.closePopup();
    }

    private subscribeForTemplateUpdates(): void {
        this.popupService.templateUpdated$.subscribe((res: TemplateRef<unknown> | null) => {
            this.template = res;
            this.cd.markForCheck();
        });
    }
}
