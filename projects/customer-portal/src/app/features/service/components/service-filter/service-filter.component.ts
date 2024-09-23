import { Component, inject, Input, OnInit, signal } from '@angular/core';
import {
  CategoryService,
  MaterialModule,
  Category
} from 'shardLib'
import { CategoryListComponent } from '../category-list/category-list.component';
import { SortComponent } from '../sort/sort.component';
@Component({
  selector: 'app-service-filter',
  standalone: true,
  imports: [
    MaterialModule,
    CategoryListComponent,
    SortComponent
  ],
  templateUrl: './service-filter.component.html',
  styleUrl: './service-filter.component.scss'
})
export class ServiceFilterComponent implements OnInit {
  @Input() isOpened = signal<boolean>(true);
  categories: Category[] = [];
  private categoryService = inject(CategoryService);
  ngOnInit(): void {
    this.loadCategories();
  }
  loadCategories() {
    this.categoryService.getAllCategory().subscribe((res: any )=> {
      this.categories = [{ id:0, name:'All'}, ...res];
    });
  }
}
