import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: 'name',
            useValue: 'SidenavComponent',
        },
    ],
})
export class SidenavComponent {
    @ViewChild(MatDrawer, {static: true})
    private readonly matDrawerComponent!: MatDrawer;

    opened: boolean | null = false;
    user: {name: string} | {age: number} | null = null;

    constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

    // ngDoCheck(): void {
    //     // eslint-disable-next-line no-console
    //     console.log(this.opened);
    // }

    // ngAfterViewInit(): void {
    //     setTimeout(() => {
    //         this.opened = true;
    //     });
    // }

    toggleSidenavOpened() {
        this.matDrawerComponent.toggle();
        this.changeDetectorRef.markForCheck();
    }
}
