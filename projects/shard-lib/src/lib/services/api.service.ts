import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstant } from '../utilities/api.constant';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  protected baseUrl = ApiConstant.API_URL;
  protected http: HttpClient = inject(HttpClient);
  constructor() { }
}
