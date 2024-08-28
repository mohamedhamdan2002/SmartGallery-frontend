import { Component, inject, OnInit } from '@angular/core';
import { CategoryForCreateOrUpdate } from '../../../../shard/models/CategoryForCreateOrUpdate';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../../core/services/category.service';
import { ICategory } from '../../../../shard/models/category';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent implements OnInit {
  status: string = 'Create';
  category?: ICategory;
  categoryModel: CategoryForCreateOrUpdate = {} as CategoryForCreateOrUpdate;
  categoryService = inject(CategoryService);
  constructor(public bsModalRef: BsModalRef) {

  }
  ngOnInit(): void {
    if(this.category) {
      this.categoryModel = { ...this.category };
      this.status = 'Edit';
    }
  }
  onSubmit() {
    if(this.category)
      this.edit();
    else
      this.create();
  }
  close(value: boolean = false) {
    this.bsModalRef.hide();
    this.bsModalRef.onHide?.emit(value);
  }

  private edit() {
    this.categoryService.updateCategory(this.category?.id || 0, this.categoryModel).subscribe(()=> {
      this.close(true);
    });
  }
  private create() {
    this.categoryService.createCategory(this.categoryModel).subscribe(() => {
      this.close(true);
    });
  }
}
