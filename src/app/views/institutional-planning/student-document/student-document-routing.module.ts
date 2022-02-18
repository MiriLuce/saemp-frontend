import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentDocumentComponent } from './student-document.component';

const routes: Routes = [
    {
        path: '',
        component: StudentDocumentComponent,
        data: {
            title: 'Documentos del Estudiante'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudentDocumentRoutingModule { }
