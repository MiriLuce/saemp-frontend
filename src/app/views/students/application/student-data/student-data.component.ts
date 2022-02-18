import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormGroupName } from '@angular/forms';
import { ValidatorFn, ValidationErrors } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

import { Properties } from './student-data-properties';
import { Application } from '../../../../models/application';
import { ApplicationService } from './../application.service';
import { Country } from '../../../../models/country';
import { Department } from '../../../../models/department';
import { District } from '../../../../models/district';
import { TypeDocumentIdentity } from '../../../../models/typeDocumentIdentity';

@Component({
  selector: 'app-student-data',
  templateUrl: './student-data.component.html',
  styleUrls: ['./student-data.component.css']
})
export class StudentDataComponent implements OnInit, OnChanges {

  @Input() typeDocumentIdentityList: TypeDocumentIdentity[];
  @Input() countryList: Country[];
  @Input() departmentList: Department[];
  @Input() districtList: District[];
  @Input() onNextStep: (application) => void;

  defaultCountry: number;
  defaultDepartment: number;
  defaultDistrict: number;

  selectedCountry: number;
  selectedDepartment: number;
  selectedDistrict: number;

  minBirthdate: Date;
  maxBirthdate: Date;
  studentBirthdate: Date;

  formProperties: any;
  applicationForm: FormGroup;
  isSubmitted: boolean;

  constructor(private builder: FormBuilder, private localeService: BsLocaleService) {
    this.formProperties = Properties;
    this.createForm();
    this.isSubmitted = false;

    this.localeService.use('es');
    this.minBirthdate = new Date();
    this.minBirthdate.setFullYear(new Date().getFullYear() - 18);
    this.maxBirthdate = new Date();
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.countryList.length > 0) {
      this.defaultCountry = this.countryList.find(item => item.isDefault).idCountry;
      this.selectedCountry = this.defaultCountry;
    }
    if (this.departmentList.length > 0) {
      this.defaultDepartment = this.departmentList.find(item => item.isDefault).idDepartment;
      this.selectedDepartment = this.defaultDepartment;
    }
    if (this.districtList.length > 0) {
      this.defaultDistrict = this.districtList.find(item => item.isDefault).idDistrict;
      this.selectedDistrict = this.defaultDistrict;
    }
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

  onChangeCountry(value) {
    this.selectedCountry = value;
    var validators = this.selectedCountry === this.defaultCountry ? [] : [Validators.required];
    this.applicationForm.controls['reference'].setValidators(validators);
  }

  onChangeDepartment(value) {
    this.selectedDepartment = value;
    if (this.selectedDepartment === this.defaultDepartment) {
      this.selectedDistrict = this.defaultDistrict;
    }
  }

  onChangeDistrict(value) {
    this.selectedDistrict = value;
  }

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
      birthCountry: this.selectedCountry,
      reference: this.applicationForm.get('reference')?.value,
      email: this.applicationForm.get('email')?.value,
      residentDepartment: this.selectedDepartment,
      residentDistrict: this.selectedDistrict,
      address: this.applicationForm.get('address')?.value,
      addressReference: this.applicationForm.get('addressReference')?.value,
      allergies: this.applicationForm.get('allergies')?.value,
      disease: this.applicationForm.get('disease')?.value,
      otherHealthProblem: this.applicationForm.get('otherHealthProblem')?.value
    };

    this.onNextStep(application);
  }
}

