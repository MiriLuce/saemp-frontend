import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormGroupName } from '@angular/forms';
import { ValidatorFn, ValidationErrors } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToasterService } from 'angular2-toaster';
import { NgxSpinnerService } from "ngx-bootstrap-spinner";

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
  selectedTypeDocumentIdentity: TypeDocumentIdentity;
  selectedBirthCountry: number;
  selectedBirthDepartment: number;
  selectedBirthProvince: number;
  selectedBirthDistrict: number;
  selectedResidentDepartment: number;
  selectedResidentProvince: number;
  selectedResidentDistrict: number;

  minBirthdate: Date;
  maxBirthdate: Date;
  patternDocumentIdentity: String;

  constructor(
    private builder: FormBuilder, 
    private localeService: BsLocaleService, 
    public commonListService: CommonListService, 
    private toasterService: ToasterService,
    private spinnerService: NgxSpinnerService
  ) {
      this.spinnerService.show();

      this.localeService.use('es');
      this.minBirthdate = new Date();
      this.minBirthdate.setFullYear(new Date().getFullYear() - 100);
      this.maxBirthdate = new Date();  

      this.getTypeDocumentIdentityList();
      this.getCoutryList();
      this.getDepartmentList();
  
      this.formProperties = Properties;
      this.isSubmitted = false;
      this.createForm();  
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
  } 
  
  createForm() { 
    this.applicationForm = this.builder.group({
      typeDocumentIdentity: ['', []],
      documentIdentity: ['', [Validators.required, this.lengthValidator.bind(this), this.patternValidator.bind(this)]],
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
    }, {  });
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

  lengthValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (this.selectedTypeDocumentIdentity == undefined || this.selectedTypeDocumentIdentity == null) {
      return null;
    }
    let lengthType = this.selectedTypeDocumentIdentity.lengthType;
    let length = this.selectedTypeDocumentIdentity.length;
    if (control.value !== undefined && (
       (lengthType == 'E' && control.value.length != length) || 
       (lengthType == 'M' && control.value.length > length))) {
        return { 'length': true };
    }
    return null;
  }

  patternValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (this.selectedTypeDocumentIdentity == undefined || this.selectedTypeDocumentIdentity == null) {
      return null;
    }
    let isValid = false;
    if (this.selectedTypeDocumentIdentity.characterType == 'A'){
      isValid = /^([A-Z0-9]+)$/.test(control.value);
    } else if (this.selectedTypeDocumentIdentity.characterType == 'N'){
      isValid = /^([0-9]+)$/.test(control.value);
    }
    if (control.value !== undefined && !isValid) {
        return { 'pattern': true };
    }
    return null;
  }

  // UBICATION SETTINGS

  getTypeDocumentIdentityList() {    
    this.commonListService.getTypeDocumentIdentityList().subscribe(
      (resp: ServiceResult) => {
        this.spinnerService.hide();
        if (resp.error == null) {
          this.typeDocumentIdentityList = resp.data;
          this.selectedTypeDocumentIdentity = this.typeDocumentIdentityList.find(item => item.isDefault); 
          this.onChangeTypeDocumentIdentity(this.selectedTypeDocumentIdentity.idTypeDocumentIdentity); 
        } else {
          this.toasterService.pop('error', 'Error', resp.error);
        }
      },
      error => {
        this.spinnerService.hide();
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

  onChangeTypeDocumentIdentity(value) {
    if (this.selectedTypeDocumentIdentity.idTypeDocumentIdentity != value){
      this.selectedTypeDocumentIdentity = this.typeDocumentIdentityList.find(item => item.idTypeDocumentIdentity == value);
    }
    if (this.selectedTypeDocumentIdentity.characterType == 'A'){
      this.formProperties.documentIdentity.errorMessages.pattern = 'El número de documento debe ser alfanumérico, con letras mayúsculas'
    } else if (this.selectedTypeDocumentIdentity.characterType == 'N'){
      this.formProperties.documentIdentity.errorMessages.pattern = 'El número de documento debe ser numérico'
    }
    if (this.selectedTypeDocumentIdentity.lengthType == 'E'){
      this.formProperties.documentIdentity.errorMessages.length = `El número de documento debe contener ${this.selectedTypeDocumentIdentity.length} caractéres`;      
    } else if (this.selectedTypeDocumentIdentity.lengthType == 'M'){
      this.formProperties.documentIdentity.errorMessages.length = `El número de documento debe contener máximo ${this.selectedTypeDocumentIdentity.length} caractéres`;      
    } 
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

