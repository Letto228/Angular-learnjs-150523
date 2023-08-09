/* tslint:disable:no-unused-variable */

import {TestBed, inject} from '@angular/core/testing';
import {PopupService} from './popup.service';

describe('Service: PopupTemplate', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PopupService],
        });
    });

    it('should ...', inject([PopupService], (service: PopupService) => {
        expect(service).toBeTruthy();
    }));
});
