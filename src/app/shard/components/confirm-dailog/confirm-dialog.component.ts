import { Component, inject, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'confirm-dialog',
  standalone: true,
  imports: [],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent implements OnInit {
  title: string = "Confirm Delete";
  message: string = "Are you Sure You Want to Delete This Item?"
  constructor(public bsModalRef: BsModalRef) {
    console.log(bsModalRef);
  }
  ngOnInit(): void {
  }
  close(confirm: boolean = false) {
    this.bsModalRef.hide();
    this.bsModalRef.onHide?.emit(confirm);
  }
}
