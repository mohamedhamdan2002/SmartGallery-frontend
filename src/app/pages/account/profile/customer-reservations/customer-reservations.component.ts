import { Component, inject, OnInit } from '@angular/core';
import { ReservationService } from '../../../../core/services/reservation.service';
import { IReservation } from '../../../../shard/models/Reservation';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'customer-reservations',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    DatePipe
  ],
  templateUrl: './customer-reservations.component.html',
  styleUrl: './customer-reservations.component.css'
})
export class CustomerReservationsComponent implements OnInit {
  reservationService = inject(ReservationService);
  reservations$!: Observable<IReservation[]>;
  ngOnInit(): void {
    this.loadReservations();
  }
  loadReservations() {
    this.reservations$ = this.reservationService.getReservationForUser();
  }
}
