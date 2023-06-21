import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    Input,
    OnDestroy,
    TemplateRef,
} from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Subscription, tap} from 'rxjs';
import {ITemplateContext, ITemplateOutlet} from './popup-interfaces';
import {PopupService} from './popup.service';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
//  решение 1 но теперь с ChangeDetectionStrategy.OnPush
export class PopupHostComponent implements OnDestroy {
    @Input() template: TemplateRef<ITemplateContext> | null = null;
    @Input() context: ITemplateContext | null = null;
    subscription!: Subscription;

    @HostBinding('class.empty')
    get isTemplateNullable() {
        return !this.template;
    }

    closePopup() {
        this.popupService.closePopup();
    }

    constructor(
        private readonly popupService: PopupService,
        private readonly changeDetector: ChangeDetectorRef,
    ) {
        this.subscription = this.popupService.openAsObservable.subscribe(
            (value: ITemplateOutlet | null) => {
                this.template = value ? value.template : null;
                this.context = value ? value.context : null;
                // eslint-disable-next-line no-console
                console.log(this.template, this.context);
                this.changeDetector.markForCheck();
            },
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

// решение 2 c ChangeDetectionStrategy.OnPush
// export class PopupHostComponent {

//     @HostBinding('class.empty')
//     empty = false;

//     closePopup() {
//         this.popupService.closePopup();
//     }
//     constructor(private readonly popupService: PopupService) {}

//     // записываем значение openAsObservable, далее получаем его с помощью async в html
//     readonly templateObject = this.popupService.openAsObservable.pipe(
//         tap(() => {
//             this.empty = !this.empty;
//         }),
//     );
// }
