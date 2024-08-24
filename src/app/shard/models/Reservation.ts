export interface IReservationForCreation {
  problemDescription: string;
  address?: Address;
  contact?: Contact;
}
export interface IReservation {
  id: number;
  service: string;
  status: string
  reservationDate: Date;
}
export interface Address {
  city: string;
  country: string;
  street: string;
}
export interface Contact {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

