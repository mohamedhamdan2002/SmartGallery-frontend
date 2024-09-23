import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import {
  MaterialModule,
  AuthService,
  LoginViewModel
} from 'shardLib';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: LoginViewModel = {} as LoginViewModel;
  private authService = inject(AuthService);
  private toastrService = inject(ToastrService);
  constructor(private ref: MatDialogRef<LoginComponent>) {
  }

  onSubmit() {
    this.authService.login(this.loginForm).subscribe(() => {
      this.toastrService.success("Login done Successfully");
      this.ref.close(true);
    });
  }
}
