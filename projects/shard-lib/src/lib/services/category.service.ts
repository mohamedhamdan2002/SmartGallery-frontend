import { Injectable } from '@angular/core';
import { Category } from '../models/category/category';
import { ApiConstant } from '../utilities/api.constant';
import { map, of } from 'rxjs';
import { ApiService } from './api.service';
import { CategoryForCreateOrUpdate } from '../models/category/categoryForCreateOrUpdate';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ApiService {
  private categories: Category[] = [];
  constructor()  {
    super();
  }
  getAllCategory() {
    if(this.categories.length > 0)
      return of(this.categories);
    return this.http.get<Category[]>(`${this.baseUrl}${ApiConstant.CATEGORIES}`)
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
