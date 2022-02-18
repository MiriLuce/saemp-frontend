import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

// Routing
import { ApplicationRoutingModule } from './application-routing.module';

import { ApplicationComponent } from './application.component';
import { StudentDataComponent } from './student-data/student-data.component';
import { SchoolOriginComponent } from './school-origin/school-origin.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsLocaleService } from 'ngx-bootstrap/datepicker'
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToasterModule } from 'angular2-toaster';

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
    ],
    declarations: [
        ApplicationComponent,
        StudentDataComponent,
        SchoolOriginComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ApplicationModule {  
    constructor(localeService: BsLocaleService) {
        defineLocale('es', esLocale);
        localeService.use('es');
    }
}
