import {Injectable} from '@angular/core';
import {CanLoad, Route, UrlSegment, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class QuestionCanLoadGuard implements CanLoad {
    canLoad(
        _route: Route,
        _segments: UrlSegment[],
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return prompt('Хотите загрузить чанк по данному пути?') === 'y';
    }
}
