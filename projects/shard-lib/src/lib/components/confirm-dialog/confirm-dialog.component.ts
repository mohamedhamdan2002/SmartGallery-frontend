import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'confirm-dialog',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent implements OnInit {
  title: string = "Confirm Delete";
  message: string = "Are you Sure You Want to Delete This Item?"

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogComponent) {
    this.title = data.title;
    this.message = data.message;
  }
  ngOnInit(): void {
  }
  close(confirm: boolean = false) {
    this.dialogRef.close(confirm);
  }
}
