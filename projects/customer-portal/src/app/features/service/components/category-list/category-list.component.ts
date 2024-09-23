import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  CategoryService,
  MaterialModule,
  Category
} from 'shardLib'
import { FilterSortService } from '../../services/filter-sort.service';
@Component({
  selector: 'category-list',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  categories: Category[] = [];
  private categoryService = inject(CategoryService);
  private filterSortService = inject(FilterSortService);
  categoryIdControl = new FormControl([0]);
  ngOnInit(): void {
    this.loadCategories();
    this.categoryIdControl.valueChanges.subscribe(categoriesIds => {
      if(categoriesIds)
        this.filterSortService.updateCategory(categoriesIds);
    });
  }
  loadCategories() {
    this.categoryService.getAllCategory().subscribe((res: any )=> {
      this.categories = res;
    });
  }
}
