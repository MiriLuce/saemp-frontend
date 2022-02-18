import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment.prod';
import { TypeDocumentIdentity } from '../models/typeDocumentIdentity';
import { Country } from '../models/country';
import { Department } from '../models/department';
import { District } from '../models/district';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private baseUrlWebApi = environment.api_base_url;
  constructor(private http: HttpClient) { }

  getTypeDocumentIdentity() : Observable<TypeDocumentIdentity> { 
    return this.http.get<TypeDocumentIdentity>(this.baseUrlWebApi + 'List/TypeDocumentIdentity')
  }

  getCountry() : Observable<Country> { 
    return this.http.get<Country>(this.baseUrlWebApi + 'List/Country')
  }
  
  getDepartment() : Observable<Department> { 
    return this.http.get<Department>(this.baseUrlWebApi + 'List/Department')
  }
  
  getDistrict() : Observable<District> { 
    return this.http.get<District>(this.baseUrlWebApi + 'List/District')
  }

}
