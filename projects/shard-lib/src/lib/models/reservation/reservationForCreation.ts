import { Contact } from "./contact";
import { Address } from "./address";

export interface ReservationForCreation {
  problemDescription: string;
  address?: Address;
  contact?: Contact;
}
