import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
    @ViewChild(MatDrawer, {static: true})
    private readonly matDrawerComponent!: MatDrawer;

    constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

    toggleSidenavOpened() {
        this.matDrawerComponent.toggle();
        this.changeDetectorRef.markForCheck();
    }
}
