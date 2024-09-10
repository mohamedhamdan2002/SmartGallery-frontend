import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog,) {

  }
  openModal(component: any, initialState?: object) {
    const dialog = this.dialog.open(component,
    {
      data: initialState
    });
    return dialog;
  }

}
