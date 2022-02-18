import { Component, OnInit } from '@angular/core';
import { ApplicationService } from './application.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';

import { Response } from '../../../models/response';
import { TypeDocumentIdentity } from '../../../models/typeDocumentIdentity';
import { Country } from '../../../models/country';
import { Department } from '../../../models/department';
import { District } from '../../../models/district';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css'],
  providers: [ApplicationService]
})
export class ApplicationComponent implements OnInit {

  public typeDocumentIdentityList: TypeDocumentIdentity[] = [];
  public countryList: Country[] = [];
  public departmentList: Department[] = [];
  public districtList: District[] = [];
  
  public toasterconfig: ToasterConfig = new ToasterConfig({ tapToDismiss: true, timeout: 5000 });

  constructor(public applicationService: ApplicationService, private toasterService: ToasterService) {

    this.applicationService.getTypeDocumentIdentityList().subscribe(
      (resp: Response) => {
        this.toasterService.pop('success', 'Success Toaster', "Prueba");
        if (resp.error == null) {
          this.typeDocumentIdentityList = resp.data;
        } else {
          this.toasterService.pop('error', 'Error', resp.error);
        }
      },
      error => {
        this.toasterService.pop('error', 'Error', error);
      }
    );

    this.applicationService.getCountryList().subscribe((resp: Response) => {
      if (resp.error == null) {
        this.countryList = resp.data
      }
    });
    
    this.applicationService.getDepartmentList().subscribe((resp: Response) => {
      if (resp.error == null) {
        this.departmentList = resp.data
      }
    });

    this.applicationService.getDistrictList().subscribe((resp: Response) => {
      if (resp.error == null) {
        this.districtList = resp.data
      }
    });
  }

  ngOnInit(): void { }

  onGetStudentData(application) {
    // TODO: Use EventEmitter with form value
    console.warn(application.value);
    alert('SUCCESS!');
  }
  
}
