import { CommonModule } from '@angular/common';
import { Component, Inject, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ReservationService } from '../../../core/services/reservation.service';
import { IReservationForCreation } from '../../../shard/models/Reservation';
import { MaterialModule } from '../../../shard/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'service-reservation-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  templateUrl: './service-reservation-form.component.html',
  styleUrl: './service-reservation-form.component.css'
})
export class ServiceReservationFormComponent {
  dialog = inject(MatDialogRef<ServiceReservationFormComponent>);
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
    const reservation = { ...this.form.value } as IReservationForCreation;
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
