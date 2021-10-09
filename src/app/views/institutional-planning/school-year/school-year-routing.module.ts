import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchoolYearComponent } from './school-year.component';

const routes: Routes = [
    {
        path: '',
        component: SchoolYearComponent,
        data: {
            title: 'Año Escolar'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SchoolYearRoutingModule { }
