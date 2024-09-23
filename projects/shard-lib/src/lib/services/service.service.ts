import { Injectable, signal } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';
import { ServiceParameters } from '../models/service/serviceParameters';
import { Pagination } from '../models/service/pagination';
import { ApiConstant } from '../utilities/api.constant';
import { Service } from '../models/service/service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService extends ApiService {
  servicesList = signal<Pagination>({ pageIndex: 1, pageSize: 10, count: 0, data: []});
  private serviceParameters: ServiceParameters = new ServiceParameters();
  constructor() {
    super();
  }
  getAllServices() {
    let params = new HttpParams();
    if(this.serviceParameters.categoriesIds != null && this.serviceParameters.categoriesIds.length != 0)
    {
      params = params.append('categoriesIds', this.serviceParameters.categoriesIds.join(','))
    }
    if(this.serviceParameters.search != null)
    {
      params = params.append('search', this.serviceParameters.search);
    }
    params = params.append('sort', this.serviceParameters.sort);
    params = params.append('pageIndex', this.serviceParameters.pageNumber);
    params = params.append('pageSize', this.serviceParameters.pageSize);
    return this.http.get<Pagination>(`${this.baseUrl}${ApiConstant.SERVICES}`, { params: params }).pipe(tap(res => {
      this.servicesList.set(res);
      console.log(res);
      console.log(this.servicesList());
      return res;
    }))
  }

  getServiceParams() {
    return this.serviceParameters;
  }
  setServiceParams(params: ServiceParameters) {
    this.serviceParameters = params;
  }

  deleteService(id: number) {
    return this.http.delete(`${this.baseUrl}${ApiConstant.SERVICES}/${id}`);
  }
  updateService(id: number, formData: FormData) {
    return this.http.put(`${this.baseUrl}${ApiConstant.SERVICES}/${id}`, formData);
  }
  createService(formData: FormData) {
    return this.http.post(`${this.baseUrl}${ApiConstant.SERVICES}`,  formData);
  }
  getServiceById(id: number) {
    return this.http.get<Service>(`${this.baseUrl}${ApiConstant.SERVICES}/${id}`);
  }


  reloadServices() {
  }
}
