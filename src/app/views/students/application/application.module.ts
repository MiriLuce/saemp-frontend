import { NgModule } from '@angular/core';

// Routing
import { ApplicationRoutingModule } from './application-routing.module';

import { ApplicationComponent } from './application.component';

@NgModule({
    imports: [
        ApplicationRoutingModule
    ],
    declarations: [
        ApplicationComponent
    ]
})
export class ApplicationModule { }
