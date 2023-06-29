import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {HeaderComponent} from './header.component';
import {HeaderModule} from './header.module';
import {PopupService} from '../../shared/popup/popup.service';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HeaderModule, RouterTestingModule],
            providers: [PopupService],
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Клик по меню', () => {
        const menuClickOutputEmitSpy = spyOn(component.menuClickOutput, 'emit');
        const trigerEvent = new Event('click');
        const {debugElement} = fixture;
        const menuButtonElement = debugElement.query(By.css('[test-id="header-button-menu"]'));

        expect(menuButtonElement).not.toBeNull();
        expect(menuClickOutputEmitSpy).not.toHaveBeenCalled();

        menuButtonElement.triggerEventHandler('click', trigerEvent);

        expect(menuClickOutputEmitSpy).toHaveBeenCalled();
    });
});
