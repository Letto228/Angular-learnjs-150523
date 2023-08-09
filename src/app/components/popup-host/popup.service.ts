import {Injectable, TemplateRef} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PopupService {
    templateUpdated$: Subject<TemplateRef<unknown> | null> = new Subject();
    // templateUpdated2$: BehaviorSubject<TemplateRef<unknown> | null> = new BehaviorSubject(null);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    openPopup(template: TemplateRef<unknown>, context?: any): void {
        this.templateUpdated$.next(template);
    }

    closePopup(): void {
        this.templateUpdated$.next(null);
    }
}
