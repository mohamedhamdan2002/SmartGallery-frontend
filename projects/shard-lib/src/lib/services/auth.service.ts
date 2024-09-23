import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { map, of } from 'rxjs';
import { LoginViewModel } from '../models/auth/loginViewModel';
import { RegisterViewModel } from '../models/auth/registerViewModel';
import { UserProfile } from '../models/auth/userProfile';
import { ApiConstant } from '../utilities/api.constant';
import { AuthResponse } from '../models/auth/authResponse';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  private userLogInStatus = signal<boolean>(false);
  constructor() {
    super();
    this.userLogInStatus.set(!!this.token);
  }
  login(loginViewModel: LoginViewModel) {
    return this.http.post<AuthResponse>(`${this.baseUrl}${ApiConstant.LOGIN}`, loginViewModel).pipe(map((response) => {
      this.updateUserStatus(response);
      return response;
    }));
  }

  register(registerViewModel: RegisterViewModel) {
    return this.http.post<AuthResponse>(`${this.baseUrl}${ApiConstant.REGISTER}`, registerViewModel).pipe(map((response) => {
      this.updateUserStatus(response);
      return response;
    }));
  }
  private updateUserStatus(response: AuthResponse) {
    this.setUserToken(response.token);
    this.userLogInStatus.set(true);
  }
  setUserToken(token: string) {
    localStorage.setItem(ApiConstant.USER_TOKEN, token);
  }
  get token() {
    return localStorage.getItem(ApiConstant.USER_TOKEN);
  }
  get isUserLogIn() : boolean {
    return this.userLogInStatus();
  }
  logout() {
    if(this.token)
      localStorage.removeItem(ApiConstant.USER_TOKEN);
    this.userLogInStatus.set(false);
    return of(true);
  }
  getUserProfile() {
    return this.http.get<UserProfile>(`${this.baseUrl}${ApiConstant.PROFILE}`);
  }

}
