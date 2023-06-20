import {ChangeDetectionStrategy, Component} from '@angular/core';
import {filter, map, switchMap, tap} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsStoreService} from '../../shared/products/products-store.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
    // readonly product$ = of(this.activaterRoute.snapshot.params['id']).pipe(
    readonly product$ = this.activatedRoute.paramMap.pipe(
        map(paramMap => paramMap.get('id')),
        filter(Boolean),
        tap(productId => {
            this.productsStoreService.loadProduct(productId);
        }),
        switchMap(() => this.productsStoreService.currentProduct$),
    );

    constructor(
        private readonly productsStoreService: ProductsStoreService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
    ) {
        // setTimeout(() => {
        //     this.router.navigate(['/product', 'kompressor-dla-sin-hyundai-hy-1540', 'type']);
        // }, 4000);
        // eslint-disable-next-line no-console
        console.log(this.activatedRoute.snapshot);
    }

    navigateToTab(tab: string) {
        // this.router.navigate([`./${tab}`], {relativeTo: this.activatedRoute});

        const urlTree = this.router.createUrlTree([`./${tab}`], {relativeTo: this.activatedRoute});

        // console.log(urlTree.toString(), urlTree);

        this.router.navigateByUrl(urlTree);
    }
}
