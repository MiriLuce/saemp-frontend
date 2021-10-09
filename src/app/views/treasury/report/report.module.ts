import { NgModule } from '@angular/core';

// Routing
import { ReportRoutingModule } from './report-routing.module';

import { ReportComponent } from './report.component';

@NgModule({
    imports: [
        ReportRoutingModule
    ],
    declarations: [
        ReportComponent
    ]
})
export class ReportModule { }
