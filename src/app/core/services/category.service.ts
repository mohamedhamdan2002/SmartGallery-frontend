import { Injectable } from '@angular/core';
import { ICategory } from '../../shard/models/category';
import { ApiConstant } from '../constant/api.constant';
import { map, of } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ApiService {
  private categories: ICategory[] = [];
  constructor()  {
    super();
  }
  getAllCategory() {
    if(this.categories.length > 0)
      return of(this.categories);
    return this.http.get<ICategory[]>(`${this.baseUrl}${ApiConstant.CATEGORIES}`)
                .pipe(map(response => {
                  this.categories = response;
                  return response;
                }));
  }
}
