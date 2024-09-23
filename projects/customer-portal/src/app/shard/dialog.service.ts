import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

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
