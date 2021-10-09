import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Planificación Institucional'
        },
        children: [
            {
                path: '',
                redirectTo: 'anhio-escolar'
            },
            {
                path: 'anhio-escolar',
                loadChildren: () => import('./school-year/school-year.module').then(m => m.SchoolYearModule)
            },
            {
                path: 'documentos-estudiante',
                loadChildren: () => import('./student-document/student-document.module').then(m => m.StudentDocumentModule)
            },
            {
                path: 'descuento',
                loadChildren: () => import('./discount/discount.module').then(m => m.DiscountModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InstitutionalPlanningRoutingModule { }
