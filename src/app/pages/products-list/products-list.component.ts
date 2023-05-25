import {Component} from '@angular/core';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    checkBuble(event: Event) {
        // eslint-disable-next-line no-console
        console.log('checkBuble event: ', event);
    }
}
