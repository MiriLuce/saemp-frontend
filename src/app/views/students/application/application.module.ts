import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Routing
import { ApplicationRoutingModule } from './application-routing.module';

import { ApplicationComponent } from './application.component';
import { StudentDataComponent } from './student-data/student-data.component';
import { SchoolOriginComponent } from './school-origin/school-origin.component';

import { BsDatepickerModule, BsLocaleService, BsDatepickerConfig  } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToasterModule } from 'angular2-toaster';
import { NgxSpinnerModule } from "ngx-bootstrap-spinner";

@NgModule({
    imports: [
        ApplicationRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BsDatepickerModule.forRoot(),
        TabsModule.forRoot(),
        ToasterModule.forRoot(),
        NgxSpinnerModule
    ],
    declarations: [
        ApplicationComponent,
        StudentDataComponent,
        SchoolOriginComponent
    ],
    bootstrap: [
        ApplicationComponent,
        StudentDataComponent,
        SchoolOriginComponent
    ],
    providers: [ 
        BsDatepickerConfig
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ApplicationModule {  
    constructor(localeService: BsLocaleService) {
        defineLocale('es', esLocale);
        localeService.use('es');
    }
}
