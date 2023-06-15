import {InjectionToken, inject} from '@angular/core';
import {baseUrl} from './base-url.const';

export const BASE_URL = new InjectionToken('Application base url', {
    providedIn: 'root',
    factory: () => baseUrl,
});

export const BASE_URL_COPY = new InjectionToken('Application base url copy', {
    providedIn: 'root',
    factory: () => inject(BASE_URL, {self: true}),
});
