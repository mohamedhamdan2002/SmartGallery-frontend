import { CommonModule } from '@angular/common';
import { Component, Input, signal, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ReservationService } from '../../../core/services/reservation.service';
import { IReservationForCreation } from '../../../shard/models/Reservation';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'service-reservation-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './service-reservation-form.component.html',
  styleUrl: './service-reservation-form.component.css'
})
export class ServiceReservationFormComponent {
  @Input() modalRef?: BsModalRef
  isAddressChecked = signal(false);
  isNotForMe = signal(false);
  form: FormGroup;
  serviceId: number;
  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private activeRoute: ActivatedRoute
  ) {
    const id = activeRoute.snapshot.paramMap.get('id');
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
