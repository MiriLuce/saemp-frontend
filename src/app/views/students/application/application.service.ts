import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../../app-backend-url';
import { Response } from '../../../models/response';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  formRules = {
    nonEmpty: '^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$'
  };

  constructor(private http: HttpClient) { }

  getTypeDocumentIdentityList() : Observable<Response> { 
    return this.http.get<Response>(BASE_URL + '/list/typedocumentidentity');    
  }

  getCountryList() : Observable<Response> {
    return this.http.get<Response>(BASE_URL + '/list/country');
  }

  getDepartmentList() : Observable<Response> {
    return this.http.get<Response>(BASE_URL + '/list/department');
  }
  
  getDistrictList() : Observable<Response> {
    return this.http.get<Response>(BASE_URL + '/list/district');
  }

}
