import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
    readonly title = 'Angular-learnjs-150523';
    readonly iconSrc = '../../../favicon.ico';

    // iconWidth = 300;

    onClick(event: Event) {
        // eslint-disable-next-line no-console
        console.log('Clicked', event);
        // event.stopPropagation();
    }
}
