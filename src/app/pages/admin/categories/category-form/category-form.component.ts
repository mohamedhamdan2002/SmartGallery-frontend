import { Component, Inject, inject, OnInit } from '@angular/core';
import { CategoryForCreateOrUpdate } from '../../../../shard/models/CategoryForCreateOrUpdate';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../../core/services/category.service';
import { ICategory } from '../../../../shard/models/category';
import { MaterialModule } from '../../../../shard/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent implements OnInit {
  status: string = 'Create';
  category?: ICategory;
  categoryModel: CategoryForCreateOrUpdate = {} as CategoryForCreateOrUpdate;
  categoryService = inject(CategoryService);
  toastrService = inject(ToastrService);
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private ref: MatDialogRef<CategoryFormComponent>,
  ) {
    this.category = this.data.category;
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
    this.ref.close(value);
  }

  private edit() {
    this.categoryService.updateCategory(this.category?.id || 0, this.categoryModel).subscribe(()=> {
      this.close(true);
      this.toastrService.success("Category was Updated successfully");
    });
  }
  private create() {
    this.categoryService.createCategory(this.categoryModel).subscribe(() => {
      this.close(true);
      this.toastrService.success("Category was Created successfully");
    });
  }
}
