import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Reservation } from '../models/reservation/reservation';
import { ApiConstant } from '../utilities/api.constant';
import { ReservationDetails } from '../models/reservation/reservationDetails';
import { ReservationForCreation } from '../models/reservation/reservationForCreation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService extends ApiService {

  constructor() {
    super();
  }

  createReservation(serviceId: number, reservationForCreation: ReservationForCreation) {
    return this.http.post<Reservation>(`${this.baseUrl}${ApiConstant.RESERVATIONS}/${serviceId}`, reservationForCreation);
  }
  getReservationForUser() {
    return this.http.get<Reservation[]>(`${this.baseUrl}${ApiConstant.RESERVATIONS}/customer`);
  }
  getAllReservations() {
    return this.http.get<ReservationDetails[]>(`${this.baseUrl}${ApiConstant.RESERVATIONS}`);
  }
}
