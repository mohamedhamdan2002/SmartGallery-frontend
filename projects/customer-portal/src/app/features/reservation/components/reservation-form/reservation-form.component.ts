import { Component, Inject, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import {
  ReservationForCreation,
  ReservationService,
  MaterialModule
} from 'shardLib';
@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.scss'
})
export class ReservationFormComponent {
  dialog = inject(MatDialogRef<ReservationFormComponent>);
  isAddressChecked = signal(false);
  isNotForMe = signal(false);
  form: FormGroup;
  serviceId: number;
  toastrService = inject(ToastrService);
  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    @Inject(MAT_DIALOG_DATA) private data : any
  ) {
    const id = data.id;
    console.log(id);
    this.serviceId = Number(id);
    this.form = this.fb.group({
      problemDescription: ['']
    });
  }
  onSubmit() {
    if(this.form.invalid)
      return;
    const reservation = { ...this.form.value } as ReservationForCreation;
    this.reservationService.createReservation(this.serviceId, reservation).subscribe((res) => {
      console.log(res);
      this.dialog.close(res);
      // this.toastrService.success("Reservation Done Successfully");
    });
  }
  onAddressInputChange() {
    this.isAddressChecked.set(!this.isAddressChecked())
    if(this.isAddressChecked())
    {
      this.form.addControl('address', this.fb.group({
        street: [null],
        city: [null],
        country: [null],
      }))
    }
    else {
      if(this.form.contains('address')) {
        this.form.removeControl('address');
      }
    }
  }
  onForMeInputChange() {
    this.isNotForMe.set(!this.isNotForMe());
    if(this.isNotForMe()) {
      this.form.addControl('contact', this.fb.group({
          firstName: [null],
          lastName: [null],
          phoneNumber: [null]
      }));
    }
    else {
      if(this.form.contains('contact')) {
        this.form.removeControl('contact');
      }
    }
    console.log(this.form.value);
  }

}
