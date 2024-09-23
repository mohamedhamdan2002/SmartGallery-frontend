import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterSortService {
  private filterSortSubject = new BehaviorSubject<{ categoriesIds: number[], sort: string}>({ categoriesIds: [], sort: 'name'});
  filterSort$ = this.filterSortSubject.asObservable();

  updateCategory(categoriesIds: number[]) {
    const current = this.filterSortSubject.value;
    this.filterSortSubject.next({ categoriesIds: categoriesIds, sort: current.sort });
  }

  updateSort(sort: string) {
    const current = this.filterSortSubject.value;
    this.filterSortSubject.next({categoriesIds: current.categoriesIds, sort: sort });
  }

}
