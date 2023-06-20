import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductComponent} from './product.component';
import {DescriptionComponent} from './description/description.component';
import {TypeComponent} from './type/type.component';

const routes: Routes = [
    {
        path: '',
        component: ProductComponent,
        children: [
            {
                path: 'description',
                component: DescriptionComponent,
            },
            {
                path: 'type',
                component: TypeComponent,
            },
            {
                path: '',
                redirectTo: 'description',
                pathMatch: 'full',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductRoutingModule {}
