import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
    // inputName = isSidenavOpenedChild
    // @Input() isSidenavOpenedChild = false;

    // outputName = inputName + 'Change'
    // @Output() isSidenavOpenedChildChange = new EventEmitter<boolean>();

    // @ViewChild('drawer')
    @ViewChild(MatDrawer, {read: MatDrawer})
    private readonly matDrawerComponent: MatDrawer | undefined;

    @ViewChild(MatDrawer, {read: ElementRef})
    private readonly matDrawerElementRef: ElementRef<HTMLElement> | undefined;

    toggleSidenavOpened() {
        // this.isSidenavOpenedChild = !this.isSidenavOpenedChild;
        // this.isSidenavOpenedChildChange.emit(!this.isSidenavOpenedChild);
        // eslint-disable-next-line no-console
        console.log(this.matDrawerElementRef?.nativeElement);
        this.matDrawerComponent?.toggle();
    }
}
