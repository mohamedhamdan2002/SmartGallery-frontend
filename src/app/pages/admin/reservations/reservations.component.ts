import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shard/material.module';
import { faArrowDown, faArrowUp, faEye, faPen, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource } from '@angular/material/table';
import { IReservation } from '../../../shard/models/Reservation';
import { ReservationService } from '../../../core/services/reservation.service';
import { ModalService } from '../../../shard/modal.service';
import { ToastrService } from 'ngx-toastr';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ReservationDetails } from '../../../shard/models/ReservationDetails';
@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [
    MaterialModule,
    FontAwesomeModule,
    DatePipe
  ],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ReservationsComponent implements OnInit {
  icons =  { add: faPlus, view: faEye ,edit: faPen, delete: faTrashCan, up: faArrowUp, down: faArrowDown};
  columnsToDisplay = ['select', 'no', 'service', 'status', 'reservationDate', 'customerName', 'customerEmail', 'customerAddress', 'edit', 'delete'];
  dataSource = new MatTableDataSource<ReservationDetails>();
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: ReservationDetails | null;
  reservationService = inject(ReservationService);
  modalService = inject(ModalService);
  toastrService = inject(ToastrService);
  selection = new SelectionModel<ReservationDetails>(true, []);

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
  checkboxLabel(position?: number, row?: ReservationDetails): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${position || 0 + 1}`;
  }

  ngOnInit(): void {
    this.reservationService.getAllReservations().subscribe(res => {
      this.dataSource.data = res;
    });
  }
}
