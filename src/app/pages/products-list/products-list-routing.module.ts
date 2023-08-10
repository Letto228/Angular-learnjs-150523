import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from '../not-found/not-found.component';
import {ProductsListComponent} from './products-list.component';

const routes: Routes = [
    {
        path: '',
        component: ProductsListComponent,
        pathMatch: 'full',
    },
    {
        path: 'category/:id',
        component: ProductsListComponent,
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductsListRoutingModule {}
