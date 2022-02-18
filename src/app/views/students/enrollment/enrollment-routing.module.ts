import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnrollmentComponent } from './enrollment.component';

const routes: Routes = [
    {
        path: '',
        component: EnrollmentComponent,
        data: {
            title: 'Matrícula'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EnrollmentRoutingModule { }
