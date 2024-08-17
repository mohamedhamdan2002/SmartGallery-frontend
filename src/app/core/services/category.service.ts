import { Injectable } from '@angular/core';
import { ICategory } from '../../shard/models/category';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { ApiConstant } from '../constant/api.constant';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = environment.apiUrl;
  private categories: ICategory[] = [];
  constructor(private http: HttpClient) { }

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
