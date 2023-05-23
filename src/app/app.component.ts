import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-root',
    // template: `
    //     <h1>Application works!</h1>
    // `,
    // styles: [`h1 {color: red}`],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    interpolation: ['{{', '}}'],
    encapsulation: ViewEncapsulation.Emulated,
})
export class AppComponent {
    title = 'Angular-learnjs-150523';
    window = window;

    onClick() {
        // eslint-disable-next-line no-console
        console.log('App clicked');
    }

    onKeyDown() {
        // eslint-disable-next-line no-console
        console.log('is Entre');
    }
}
