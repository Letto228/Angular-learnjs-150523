import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {
    @Input() rating = 0;
    @Input() ratingMax = 5;

    range: any[] | undefined;

    ngOnInit() {
        this.range = this.ratingMax ? Array.from(new Array(this.ratingMax)) : undefined;
    }
}
