import { IReservation, Address, Contact } from "./Reservation";


export interface ReservationDetails extends IReservation {
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  problemDescription: string;
  address?: Address;
  contact?: Contact;
}
