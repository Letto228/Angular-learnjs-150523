import {Component, ViewChild} from '@angular/core';
import {applicationConfigMock} from './shared/application-config/application-config.mock';
import {SidenavComponent} from './components/sidenav/sidenav.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    // title = 'Angular-learnjs-150523';
    readonly applicationConfig = applicationConfigMock;

    @ViewChild('sidenav')
    private readonly sidenavComponent: SidenavComponent | undefined;

    // isSidenavOpenedApp = false;

    onMenuClickApp() {
        // eslint-disable-next-line no-console
        // console.log('Menu click event in app component', clientXObj);
        // this.isSidenavOpenedApp = !this.isSidenavOpenedApp;
        this.sidenavComponent?.toggleSidenavOpened();
    }

    // onSidenavOpenedChange(newIsSidenavOpened: boolean) {
    //     this.isSidenavOpenedApp = newIsSidenavOpened;
    // }
}
