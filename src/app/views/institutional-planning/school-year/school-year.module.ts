import { NgModule } from '@angular/core';

// Routing
import { SchoolYearRoutingModule } from './school-year-routing.module';

import { SchoolYearComponent } from './school-year.component';

@NgModule({
    imports: [
        SchoolYearRoutingModule
    ],
    declarations: [
        SchoolYearComponent
    ]
})
export class SchoolYearModule { }
