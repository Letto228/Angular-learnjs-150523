import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundModule} from './pages/not-found/not-found.module';
import {NotFoundComponent} from './pages/not-found/not-found.component';

// `${host}/products-list` - `http://localhost:4200/products-list`
// 1 segment === 'products-list'

// `${host}/product/id` - `http://localhost:4200/product/id`
// 1 segment === 'product'
// 2 segment === 'id'

// `${host}/abra/kadabra` - `http://localhost:4200/abra/kadabra`
// 1 segment === 'abra'
// 2 segment === 'kadabra'

// with children
// `${host}/product/id/description` - `http://localhost:4200/product/id/description`
// 1 segment === 'product'
// 2 segment === 'id'
// 3 segment === 'description'

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full', // `http://localhost:4200`
        redirectTo: '/products-list',
    },
    {
        path: 'products-list',
        // component: ProductsListComponent,
        loadChildren: () =>
            import('./pages/products-list/products-list.module').then(m => m.ProductsListModule),
    },
    {
        path: 'product/:id',
        loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule),
        // component: ProductComponent,
        // children: [
        //     {
        //         path: 'description',
        //         component: DescriptionComponent,
        //     },
        //     {
        //         path: 'type',
        //         component: TypeComponent,
        //     },
        //     {
        //         path: '',
        //         redirectTo: 'description',
        //         pathMatch: 'full',
        //     },
        // ],
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];

// pathMatch: 'prefix'
// (urlSegments = (url - host).split('/')) urlSegments.startWith(path);

// pathMatch: 'full'
// (segments = (url - host)) segments === path;

@NgModule({
    imports: [RouterModule.forRoot(routes), NotFoundModule],
    exports: [RouterModule],
})
export class AppRoutingModule {}
