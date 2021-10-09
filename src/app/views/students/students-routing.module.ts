import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Estudiantes'
        },
        children: [
            {
                path: '',
                redirectTo: 'busqueda'
            },
            {
                path: 'inscripcion',
                loadChildren: () => import('./application/application.module').then(m => m.ApplicationModule)
            },
            {
                path: 'matricula',
                loadChildren: () => import('./enrollment/enrollment.module').then(m => m.EnrollmentModule)
            },
            {
                path: 'busqueda',
                loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudentsRoutingModule { }
