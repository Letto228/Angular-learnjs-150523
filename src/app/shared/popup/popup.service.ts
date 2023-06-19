import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IPopup} from './popup.interface';

@Injectable({
    providedIn: 'root',
})
export class PopupService {
    private readonly popup$ = new BehaviorSubject<IPopup | null>(null);

    get popupStream$(): Observable<IPopup | null> {
        return this.popup$.asObservable();
    }

    openPopup(popupData: IPopup): void {
        this.popup$.next(popupData);
    }

    closePopup(): void {
        this.popup$.next(null);
    }
}
