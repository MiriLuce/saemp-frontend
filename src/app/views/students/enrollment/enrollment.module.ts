import { NgModule } from '@angular/core';

// Routing
import { EnrollmentRoutingModule } from './enrollment-routing.module';

import { EnrollmentComponent } from './enrollment.component';

@NgModule({
    imports: [
        EnrollmentRoutingModule
    ],
    declarations: [
        EnrollmentComponent
    ]
})
export class EnrollmentModule { }
