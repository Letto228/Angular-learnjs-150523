import {Injectable} from '@angular/core';
import {PreloadingStrategy, Route} from '@angular/router';
import {Observable, of, switchMap, timer} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CustomPreloadingService implements PreloadingStrategy {
    preload(route: Route, load$: () => Observable<unknown>): Observable<unknown> {
        // eslint-disable-next-line dot-notation
        if (route.data?.['preload']) {
            // eslint-disable-next-line no-console
            console.log(route.path, 'Preload');

            return timer(5000).pipe(switchMap(() => load$()));
        }

        // eslint-disable-next-line no-console
        console.log(route.path, 'NO Preload');

        return of(null);
    }
}
