import { ChangeDetectorRef, Component, inject, OnInit, TemplateRef } from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';
import { ICategory } from '../../../shard/models/category';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CategoryService } from '../../../core/services/category.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from '../../../shard/modal.service';
import { ConfirmDialogComponent } from '../../../shard/components/confirm-dailog/confirm-dialog.component';
import { CategoryFormComponent } from './category-form/category-form.component';
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    FontAwesomeModule,
    ConfirmDialogComponent
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  icons =  { edit: faPen, delete: faTrashCan };
  categories$!: Observable<ICategory[]>;
  categoryService = inject(CategoryService);
  modalService = inject(ModalService);
  cd = inject(ChangeDetectorRef);
  ngOnInit(): void {
    this.loadCategories();
  }
  loadCategories() {
    console.log('Loading categories...');
    this.categories$ = this.categoryService.getAllCategory();
  }

  openConfirmDialog(category: ICategory) {
    const initialState = {
      title: "Delete Category",
      message: `are you sure you want to delete this category: '${category.name}'?`
    }
    const ref = this.modalService.openModal(ConfirmDialogComponent, initialState);
    ref.onHide?.subscribe((value) => {
      if(value == true) {
        this.deleteCategory(category.id);
      }
    });
  }
  private deleteCategory(categoryId: number) {
    this.categoryService.deleteCategory(categoryId).subscribe(
      () => {
        this.categories$ = this.categories$.pipe(map((categories)=> categories.filter(c => c.id !== categoryId)));
      }
    );
  }
  onEdit(category: ICategory) {
    this.openCategoryForm(category);
  }
  onCreate() {
    this.openCategoryForm();
  }

  openCategoryForm(category?: ICategory) {
    const initialState = {
      category: category
    }
    const ref = this.modalService.openModal(CategoryFormComponent, initialState);
    ref.onHide?.subscribe((value) => {
      if(value == true) {
        this.loadCategories();
        this.cd.detectChanges();
      }
    });
  }
}
