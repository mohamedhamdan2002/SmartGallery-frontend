import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { ApiConstant } from '../constant/api.constant';
import { LoginViewModel } from '../../shard/models/LoginViewModel';
import { AuthResponse } from '../../shard/models/AuthResponse';
import { map } from 'rxjs';


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
      this.setUserToken(response.token);
      this.userLogInStatus.set(true);
      return response;
    }));
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

}
