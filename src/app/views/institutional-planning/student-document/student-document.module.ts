import { NgModule } from '@angular/core';

// Routing
import { StudentDocumentRoutingModule } from './student-document-routing.module';

import { StudentDocumentComponent } from './student-document.component';

@NgModule({
    imports: [
        StudentDocumentRoutingModule
    ],
    declarations: [
        StudentDocumentComponent
    ]
})
export class StudentDocumentModule { }
