import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IApplicationConfig} from '../../shared/application-config/application-config.interface';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
    // readonly title = 'Angular-learnjs-150523';
    // readonly iconSrc = '../../../favicon.ico';
    @Input() applicationConfig: IApplicationConfig | null = null;

    @Output() menuClickOutput = new EventEmitter<{clientX: number}>();

    onMenuClickHeader(event: MouseEvent) {
        // eslint-disable-next-line no-console
        console.log('Menu click');
        // this.menuClick.next(event.clientX);
        this.menuClickOutput.emit({clientX: event.clientX});
    }
}
