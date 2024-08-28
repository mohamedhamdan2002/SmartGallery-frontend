import { Injectable } from '@angular/core';
import { ICategory } from '../../shard/models/category';
import { ApiConstant } from '../constant/api.constant';
import { map, of } from 'rxjs';
import { ApiService } from './api.service';
import { CategoryForCreateOrUpdate } from '../../shard/models/CategoryForCreateOrUpdate';

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
  deleteCategory(id: number) {
    return this.http.delete(`${this.baseUrl}${ApiConstant.CATEGORIES}/${id}`);
  }
  updateCategory(id: number, categoryModel: CategoryForCreateOrUpdate) {
    return this.http.put(`${this.baseUrl}${ApiConstant.CATEGORIES}/${id}`, categoryModel);
  }
  createCategory(categoryModel: CategoryForCreateOrUpdate) {
    return this.http.post(`${this.baseUrl}${ApiConstant.CATEGORIES}`, categoryModel);
  }
}
