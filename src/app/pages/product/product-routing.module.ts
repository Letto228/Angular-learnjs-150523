import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductComponent} from './product.component';
import {DescriptionComponent} from './description/description.component';
import {TypeComponent} from './type/type.component';
// import {QuestionCanActivateChildGuard} from '../../shared/test-guard/question-can-activate-child.guard';
import {QuestionCanDeactivateGuard} from '../../shared/test-guard/question-can-deactivate.guard';

const routes: Routes = [
    {
        path: '',
        component: ProductComponent,
        canDeactivate: [QuestionCanDeactivateGuard],
        // canActivateChild: [QuestionCanActivateChildGuard],
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
