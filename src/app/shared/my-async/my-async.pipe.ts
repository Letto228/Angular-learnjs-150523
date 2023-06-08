import {ChangeDetectorRef, Pipe, PipeTransform} from '@angular/core';
import {Observable, Subscription} from 'rxjs';

@Pipe({
    name: 'myAsync',
    pure: false,
})
export class MyAsyncPipe<T> implements PipeTransform {
    private value: T | null = null;
    private subscripton: Subscription | null = null;

    constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

    transform(stream$: Observable<T>): T | null {
        if (!this.subscripton) {
            this.subscripton = stream$.subscribe(value => {
                this.value = value;
                this.changeDetectorRef.markForCheck();
            });
        }

        return this.value;
    }
}
