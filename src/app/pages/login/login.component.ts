import { Component, inject, OnChanges, SimpleChanges } from '@angular/core';
import { LoginViewModel } from '../../shard/models/LoginViewModel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
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
  private router = inject(Router);
  constructor(private authService: AuthService) {
    console.log("login constructor was called!")
  }
  onSubmit() {
    this.authService.login(this.loginForm).subscribe(res => {
      if(res) {
        console.log(res);
        this.router.navigateByUrl('home');
      }
    });
  }
}
