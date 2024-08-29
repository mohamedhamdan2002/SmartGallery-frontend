import { ChangeDetectorRef, Component, inject, OnInit, TemplateRef } from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';
import { ICategory } from '../../../shard/models/category';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CategoryService } from '../../../core/services/category.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faPen, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from '../../../shard/modal.service';
import { ConfirmDialogComponent } from '../../../shard/components/confirm-dailog/confirm-dialog.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../../shard/material.module';
import { SelectionModel } from '@angular/cdk/collections';
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    FontAwesomeModule,
    ConfirmDialogComponent,
    MaterialModule
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  icons =  { add: faPlus, view: faEye ,edit: faPen, delete: faTrashCan };
  columnsToDisplay = ['select', 'no', 'name', 'edit', 'delete'];
  dataSource = new MatTableDataSource<ICategory>();
  categoryService = inject(CategoryService);
  modalService = inject(ModalService);
  ngOnInit(): void {
    this.loadCategories();
  }
  loadCategories() {
    this.categoryService.getAllCategory().subscribe((res)=> {
      console.log(res);
      this.dataSource.data = res;
    });
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
        this.dataSource.data = this.dataSource.data.filter(c => c.id !== categoryId);
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
      }
    });
  }

  selection = new SelectionModel<ICategory>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(position?: number, row?: ICategory): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${position || 0 + 1}`;
  }
}
