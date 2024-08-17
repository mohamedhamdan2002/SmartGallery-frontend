import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { LoginViewModel } from '../../shard/models/LoginViewModel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: LoginViewModel = {} as LoginViewModel;
  constructor() {
    console.log("login constructor was called!")
  }
  onSubmit() {
    console.log(this.loginForm);
  }
}
