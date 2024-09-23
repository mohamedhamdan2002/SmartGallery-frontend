import { Address } from "./address";
import { Contact } from "./contact";
import { Reservation } from "./reservation";
export interface ReservationDetails extends Reservation {
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  problemDescription: string;
  address?: Address;
  contact?: Contact;
}
