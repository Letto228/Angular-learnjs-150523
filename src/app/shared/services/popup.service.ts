import {Injectable, TemplateRef} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface PopupContent<T extends object> {
    template: TemplateRef<T>;
    context: T;
}

@Injectable({
    providedIn: 'root',
})
export class PopupService {
    popupTemplate$ = new BehaviorSubject<PopupContent<object> | null>(null);

    openPopup<T extends object>(content: PopupContent<T>) {
        this.popupTemplate$.next(content);
    }

    closePopup() {
        this.popupTemplate$.next(null);
    }
}
