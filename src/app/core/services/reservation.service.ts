import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { IReservation, IReservationForCreation } from '../../shard/models/Reservation';
import { ApiConstant } from '../constant/api.constant';
import { ReservationDetails } from '../../shard/models/ReservationDetails';

@Injectable({
  providedIn: 'root'
})
export class ReservationService extends ApiService {

  constructor() {
    super();
  }

  createReservation(serviceId: number, reservationForCreation: IReservationForCreation) {
    return this.http.post<IReservation>(`${this.baseUrl}${ApiConstant.RESERVATIONS}/${serviceId}`, reservationForCreation);
  }
  getReservationForUser() {
    return this.http.get<IReservation[]>(`${this.baseUrl}${ApiConstant.RESERVATIONS}/customer`);
  }
  getAllReservations() {
    return this.http.get<ReservationDetails[]>(`${this.baseUrl}${ApiConstant.RESERVATIONS}`);
  }
}
