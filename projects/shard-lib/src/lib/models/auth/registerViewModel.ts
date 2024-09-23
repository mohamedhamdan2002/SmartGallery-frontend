import { LoginViewModel } from "./loginViewModel";

export interface RegisterViewModel extends LoginViewModel {
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
}
