import {Injectable, TemplateRef} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ITemplateContext, ITemplateOutlet} from './popup-interfaces';

@Injectable()
export class PopupService {
    readonly open = new BehaviorSubject<ITemplateOutlet | null>(null);
    readonly openAsObservable: Observable<ITemplateOutlet | null> = this.open.asObservable();

    openPopup(template: TemplateRef<ITemplateContext>, context: ITemplateContext) {
        const object: ITemplateOutlet = {template, context};

        this.open.next(object);
    }

    closePopup() {
        this.open.next(null);
    }
}
