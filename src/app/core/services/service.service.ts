import { Injectable } from '@angular/core';
import { IService } from '../../shard/models/service';
import { ServiceParameters } from '../../shard/models/ServiceParameters';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination } from '../../shard/models/pagination';
import { ApiConstant } from '../constant/api.constant';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  baseUrl = environment.apiUrl;
  private serviceParameters: ServiceParameters = new ServiceParameters();
  constructor(private http: HttpClient) { }
  getAllServices() {
    let params = new HttpParams();
    if(this.serviceParameters.categoryId != null && this.serviceParameters.categoryId != 0)
    {
      params = params.append('categoryId', this.serviceParameters.categoryId)
    }
    if(this.serviceParameters.search != null)
    {
      params = params.append('search', this.serviceParameters.search);
    }
    params = params.append('sort', this.serviceParameters.sort);
    params = params.append('pageIndex', this.serviceParameters.pageNumber);
    params = params.append('pageSize', this.serviceParameters.pageSize);
    return this.http.get<IPagination>(`${this.baseUrl}${ApiConstant.SERVICES}`, { params: params })
  }

  getServiceParams() {
    return this.serviceParameters;
  }
  setServiceParams(params: ServiceParameters) {
    this.serviceParameters = params;
  }
}
