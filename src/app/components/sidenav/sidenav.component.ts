import {Component, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
    // @Input() set listTemplate(template: TemplateRef<unknown>) {
    //     this.insertListTemplate(template);
    // }

    @ViewChild(MatDrawer, {static: true})
    private readonly matDrawerComponent!: MatDrawer;

    @ViewChild('listViewpotr', {read: ViewContainerRef, static: true})
    private readonly listViewpotr!: ViewContainerRef;

    // @ContentChild(MatList, {static: true})
    // private readonly matList!: MatList;

    // @ContentChild('listTemplate', {static: true})
    // private readonly listTemplate!: TemplateRef<unknown>;

    // ngOnInit(): void {
    //     this.insertListTemplate(this.listTemplate);
    // }

    // ngOnChanges({listTemplate}: SimpleChanges): void {
    //     if (listTemplate) {
    //         this.insertListTemplate();
    //     }
    // }

    private insertListTemplate(listTemplate: TemplateRef<unknown>) {
        // if (this.listViewpotr.length) {
        //     this.listViewpotr.remove(0);
        // }

        this.listViewpotr.clear();
        this.listViewpotr.createEmbeddedView(listTemplate);
        // eslint-disable-next-line no-console
        console.log(this.listViewpotr.length);
    }

    // @ViewChild('test', {static: false})
    // private readonly test: ElementRef | undefined;

    // @ViewChild('testStatic', {static: true})
    // private readonly testStatic: ElementRef | undefined;

    // ngOnInit(): void {
    //     // eslint-disable-next-line no-console
    //     console.log('ngOnInit', this.test);
    //     // eslint-disable-next-line no-console
    //     console.log('ngOnInit', this.testStatic);
    // }

    // ngAfterViewInit(): void {
    // eslint-disable-next-line no-console
    // console.log('ngAfterViewInit', this.test);
    // eslint-disable-next-line no-console
    // console.log('ngAfterViewInit', this.testStatic);
    // }

    // isView = true;

    toggleSidenavOpened() {
        // eslint-disable-next-line no-console
        // console.log(this.test);
        // this.isView = !this.isView;
        // console.log(this.matList);
        this.matDrawerComponent.toggle();
    }
}
