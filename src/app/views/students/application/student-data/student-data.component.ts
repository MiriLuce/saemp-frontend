import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormGroupName } from '@angular/forms';
import { ValidatorFn, ValidationErrors } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToasterService, ToasterConfig } from 'angular2-toaster';

import { CommonListService } from './../../../../services/commonList.service';
import { Properties } from './student-data-properties';

import { ServiceResult } from '../../../../models/serviceResult';
import { TypeDocumentIdentity } from '../../../../models/typeDocumentIdentity';
import { Country } from '../../../../models/country';
import { Department } from '../../../../models/department';
import { Province } from '../../../../models/province';
import { District } from '../../../../models/district';
import { Application } from '../../../../models/application';

@Component({
  selector: 'app-student-data',
  templateUrl: './student-data.component.html',
  styleUrls: ['./student-data.component.css'],
  providers: [CommonListService]
})
export class StudentDataComponent implements OnInit, OnChanges {

  public toasterconfig: ToasterConfig = new ToasterConfig({ tapToDismiss: true, timeout: 5000 });

  @Input() onNextStep: (application) => void;

  formProperties: any;
  applicationForm: FormGroup;
  isSubmitted: boolean; 

  typeDocumentIdentityList: TypeDocumentIdentity[];
  countryList: Country[];
  departmentList: Department[];
  provinceBirthList: Province[];
  districtBirthList: District[];
  provinceResidentList: Province[];
  districtResidentList: District[];

  defaultCountry: number;
  selectedBirthCountry: number;
  selectedBirthDepartment: number;
  selectedBirthProvince: number;
  selectedBirthDistrict: number;
  selectedResidentDepartment: number;
  selectedResidentProvince: number;
  selectedResidentDistrict: number;

  minBirthdate: Date;
  maxBirthdate: Date;
  studentBirthdate: Date;

  constructor(private builder: FormBuilder, 
    private localeService: BsLocaleService, 
    public commonListService: CommonListService, 
    private toasterService: ToasterService) {

    this.formProperties = Properties;
    this.createForm();
    this.isSubmitted = false;

    this.localeService.use('es');
    this.minBirthdate = new Date();
    this.minBirthdate.setFullYear(new Date().getFullYear() - 18);
    this.maxBirthdate = new Date();
    
    this.getTypeDocumentIdentityList();
    this.getCoutryList();
    this.getDepartmentList();
  }

  ngOnInit(): void {
  }

  ngOnChanges() {/*
    if (this.countryList.length > 0) {
      this.defaultCountry = this.countryList.find(item => item.isDefault).idCountry;
      this.selectedBirthCountry = this.defaultCountry;
    }
    if (this.departmentList.length > 0) {
      this.defaultDepartment = this.departmentList.find(item => item.isDefault).idDepartment;
      this.selectedBirthDepartment = this.defaultDepartment;
      this.selectedResidentDepartment = this.defaultDepartment;
    }
    if (this.districtList.length > 0) {
      this.defaultDistrict = this.districtList.find(item => item.isDefault).idDistrict;
      this.selectedResidentDistrict = this.defaultDistrict;
    }*/
  }

  createForm() {
    this.applicationForm = this.builder.group({
      typeDocumentIdentity: ['', []],
      documentIdentity: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      middleName: ['', []],
      fatherlastName: ['', [Validators.required]],
      motherlastName: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      birthCountry: ['', []],
      reference: ['', []],
      email: ['', [Validators.required, Validators.email]],
      residentDepartment: ['', []],
      residentDistrict: ['', []],
      address: ['', [Validators.required]],
      addressReference: ['', [Validators.required]],
      allergies: ['', []],
      disease: ['', []],
      otherHealthProblem: ['', []]
    }, {});
  }

  // convenience getter for easy access to form fields
  get f() { return this.applicationForm.controls; }

  onReset() {
    this.applicationForm.reset();
  }

  onSubmit() {
    // stop here if form is invalid
    this.isSubmitted = true;
    if (this.applicationForm.invalid) {
      return;
    }

    const application: Application = {
      idApplication: 0,
      typeDocumentIdentity: this.applicationForm.get('typeDocumentIdentity')?.value,
      documentIdentity: this.applicationForm.get('documentIdentity')?.value,
      firstName: this.applicationForm.get('firstName')?.value,
      middleName: this.applicationForm.get('middleName')?.value,
      fatherlastName: this.applicationForm.get('fatherlastName')?.value,
      motherlastName: this.applicationForm.get('motherlastName')?.value,
      birthdate: this.applicationForm.get('birthdate')?.value,
      birthCountry: this.selectedBirthCountry,
      reference: this.applicationForm.get('reference')?.value,
      email: this.applicationForm.get('email')?.value,
      residentDepartment: this.selectedResidentDepartment,
      residentDistrict: this.selectedResidentDistrict,
      address: this.applicationForm.get('address')?.value,
      addressReference: this.applicationForm.get('addressReference')?.value,
      allergies: this.applicationForm.get('allergies')?.value,
      disease: this.applicationForm.get('disease')?.value,
      otherHealthProblem: this.applicationForm.get('otherHealthProblem')?.value
    };

    this.onNextStep(application);
  }

  // UBICATION SETTINGS

  getTypeDocumentIdentityList() {    
    this.commonListService.getTypeDocumentIdentityList().subscribe(
      (resp: ServiceResult) => {
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
  }

  getCoutryList(){    
    this.commonListService.getCountryList().subscribe(
      (resp: ServiceResult) => {
        if (resp.error == null) {
          this.countryList = resp.data;
          this.defaultCountry = this.countryList.find(item => item.isDefault).idCountry;
          this.selectedBirthCountry = this.defaultCountry;
        } else {
          this.toasterService.pop('error', 'Error', resp.error);
        }
      },
      error => {
        this.toasterService.pop('error', 'Error', error);
      }
    );
  }

  getDepartmentList(){    
    this.commonListService.getDepartmentList().subscribe(
      (resp: ServiceResult) => {
        if (resp.error == null) {
          this.departmentList = resp.data;
          let defaultDepartment = this.departmentList.find(item => item.isDefault).idDepartment;
          this.onChangeBirthDepartment(defaultDepartment);
          this.onChangeResidentDepartment(defaultDepartment);
        } else {
          this.toasterService.pop('error', 'Error', resp.error);
        }
      },
      error => {
        this.toasterService.pop('error', 'Error', error);
      }
    );
  }

  getProvinceList(idDepartment: number, isResident: boolean){
    this.commonListService.getProvinceList(idDepartment).subscribe(
      (resp: ServiceResult) => {
        if (resp.error == null) {
          let defaultProvince = resp.data.find(item => item.isDefault);
          if (defaultProvince == null) { 
            defaultProvince = resp.data[0];
          }
          if (isResident) {
            this.provinceResidentList = resp.data;
            this.onChangeResidentProvince(defaultProvince.idProvince);
          } else {
            this.provinceBirthList = resp.data;
            this.onChangeBirthProvince(defaultProvince.idProvince);
          }
        } else {
          this.toasterService.pop('error', 'Error', resp.error);
        }
      },
      error => {
        this.toasterService.pop('error', 'Error', error);
      }
    );
  }

  getDistrictList(idDepartment: number, idProvince: number, isResident: boolean){
    this.commonListService.getDistrictList(idDepartment, idProvince).subscribe(
      (resp: ServiceResult) => {
        if (resp.error == null) {    
          let defaultDistrict = resp.data.find(item => item.isDefault);
          if (defaultDistrict == null) { 
            defaultDistrict = resp.data[0];
          }
          if (isResident) {
            this.districtResidentList = resp.data;
            this.selectedResidentProvince = defaultDistrict.idDistrict;
          } else {
            this.districtBirthList = resp.data;
            this.selectedBirthDistrict = defaultDistrict.idDistrict;
          }
        } else {
          this.toasterService.pop('error', 'Error', resp.error);
        }
      },
      error => {
        this.toasterService.pop('error', 'Error', error);
      }
    );
  }

  onChangeBirthCountry(value) {
    this.selectedBirthCountry = value;
    var validators = this.selectedBirthCountry === this.defaultCountry ? [] : [Validators.required];
    this.applicationForm.controls['reference'].setValidators(validators);
  }

  onChangeBirthDepartment(value) {
    this.selectedBirthDepartment = value;
    this.getProvinceList(this.selectedBirthDepartment , false);
  }

  onChangeBirthProvince(value) {
    this.selectedBirthProvince = value;
    this.getDistrictList(this.selectedBirthDepartment , this.selectedBirthProvince , false);
  }

  onChangeBirthDistrict(value) {
    this.selectedBirthDistrict = value;
  }

  onChangeResidentDepartment(value) {
    this.selectedResidentDepartment = value;
    this.getProvinceList(this.selectedResidentDepartment , true);
  }

  onChangeResidentProvince(value) {
    this.selectedResidentProvince = value;
    this.getDistrictList(this.selectedResidentDepartment , this.selectedResidentProvince, true);
  }

  onChangeResidentDistrict(value) {
    this.selectedResidentDistrict = value;
  }

}

