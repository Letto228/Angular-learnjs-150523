import {ChangeDetectionStrategy, Component} from '@angular/core';
// import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {applicationConfigMock} from './shared/application-config/application-config.mock';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: 'name',
            useValue: 'AppComponent',
        },
    ],
})
export class AppComponent {
    readonly applicationConfig = applicationConfigMock;

    // constructor(@Inject(HTTP_INTERCEPTORS) private readonly inter: unknown[]) {
    //     // eslint-disable-next-line no-console
    //     console.log(this.inter);
    // }
}
