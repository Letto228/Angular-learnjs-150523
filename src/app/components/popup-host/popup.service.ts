import {Injectable, TemplateRef} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PopupService {
    templateUpdated$ = new BehaviorSubject<TemplateRef<unknown> | null>(null);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    openPopup(template: TemplateRef<unknown>, context?: any): void {
        this.templateUpdated$.next(template);
    }

    closePopup(): void {
        this.templateUpdated$.next(null);
    }
}
