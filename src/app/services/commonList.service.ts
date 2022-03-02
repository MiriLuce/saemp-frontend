import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment.prod';
import { ServiceResult } from '../models/serviceResult';

@Injectable({
  providedIn: 'root'
})
export class CommonListService {

  private baseUrlWebApi = environment.api_base_url;
  constructor(private http: HttpClient) { }

  getTypeDocumentIdentityList() : Observable<ServiceResult> {
    return this.http.get<ServiceResult>(this.baseUrlWebApi + '/CommonList/TypeDocumentIdentity')
  }

  getCountryList() : Observable<ServiceResult> { 
    return this.http.get<ServiceResult>(this.baseUrlWebApi + '/CommonList/Country')
  }
  
  getDepartmentList() : Observable<ServiceResult> { 
    return this.http.get<ServiceResult>(this.baseUrlWebApi + '/CommonList/Department')
  }
  
  getProvinceList(idDepartment: number = 0) : Observable<ServiceResult> { 
    let query = '?idDepartment=' + idDepartment;
    return this.http.get<ServiceResult>(this.baseUrlWebApi + '/CommonList/Province' + query)
  }
  
  getDistrictList(idDepartment: number = 0, idProvince: number = 0) : Observable<ServiceResult> { 
    let query = '?idDepartment=' + idDepartment + '&idProvince=' + idProvince;
    return this.http.get<ServiceResult>(this.baseUrlWebApi + '/CommonList/District' + query)
  }

}
