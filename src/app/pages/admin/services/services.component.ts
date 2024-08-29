import { Component, inject } from '@angular/core';
import { IService } from '../../../shard/models/service';
import { ServiceItemComponent } from '../../service-page/service-item/service-item.component';
import { ServiceService } from '../../../core/services/service.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen, faTrashCan, faArrowDown, faArrowUp, faPlus, faEye } from '@fortawesome/free-solid-svg-icons';
import { MaterialModule } from '../../../shard/material.module';
import { MatTableDataSource,  } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDateSelectionModel } from '@angular/material/datepicker';
import { SelectionModel } from '@angular/cdk/collections';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    FontAwesomeModule,
    MaterialModule,
    RouterLink
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ServicesComponent {
  icons =  { add: faPlus, view: faEye ,edit: faPen, delete: faTrashCan, up: faArrowUp, down: faArrowDown};
  columnsToDisplay = ['select', 'no', 'service', 'category', 'cost', 'edit', 'delete'];
  dataSource = new MatTableDataSource<IService>();
  service = inject(ServiceService);
  ngOnInit(): void {
    this.loadServices();
  }
  loadServices() {
    this.service.getAllServices().subscribe((res) => {
      this.dataSource.data = res.data;
    });
  }

  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: IService | null;
  edit() {
    console.log("edit button clicked ");
  }
  delete() {
    console.log("delete button clicked")
  }

  selection = new SelectionModel<IService>(true, []);

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
  checkboxLabel(position?: number, row?: IService): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${position || 0 + 1}`;
  }
}





