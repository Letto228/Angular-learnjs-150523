import {NgModule} from '@angular/core';
import {
    // ActivatedRouteSnapshot,
    NoPreloading,
    RouterModule,
    // RouterStateSnapshot,
    Routes,
} from '@angular/router';
import {NotFoundModule} from './pages/not-found/not-found.module';
import {NotFoundComponent} from './pages/not-found/not-found.component';
// import {CustomPreloadingService} from './shared/preloading-strategy/custom-preloading.service';
import {QuestionCanActivateGuard} from './shared/test-guard/question-can-activate.guard';
import {QuestionCanLoadGuard} from './shared/test-guard/question-can-load.guard';
// import {ProductsResolver} from './shared/test-guard/products.resolver';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/products-list',
    },
    {
        path: 'products-list',
        loadChildren: () =>
            import('./pages/products-list/products-list.module').then(m => m.ProductsListModule),
        // resolve: {
        //     products: ProductsResolver,
        // },
        // canMatch: [
        //     (...args: any[]) => {
        //         console.log(args);

        //         return prompt('Эта та конфигурация?') === 'y';
        //     },
        // ],
    },
    {
        path: 'product/:id',
        loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule),
        // canActivate: [
        // (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
        //     inject(QuestionCanActivateGuard).canActivate(route, state),
        // () => prompt('Хотите перейти по данному пути?') === 'y',
        // ],
        canActivate: [QuestionCanActivateGuard],
        canLoad: [QuestionCanLoadGuard],
        data: {
            preload: true,
        },
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: NoPreloading}), NotFoundModule],
    exports: [RouterModule],
})
export class AppRoutingModule {}
