import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Review } from '../../shard/models/Review';
import { ApiConstant } from '../constant/api.constant';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService extends ApiService {

  constructor() {
    super();
  }

  getReviewsForService(serviceId: number) {
    return this.http.get<Review[]>(`${this.baseUrl}${ApiConstant.REVIEWS}`,{
      params: { serviceId: serviceId }
    });
  }
}
