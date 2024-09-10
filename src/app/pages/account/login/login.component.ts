import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LoginViewModel } from '../../../shard/models/LoginViewModel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../../../shard/material.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: LoginViewModel = {} as LoginViewModel;
  redirectUrl!: string;
  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private toastrService = inject(ToastrService);
  ngOnInit(): void {
    if(this.authService.isUserLogIn)
      history.back();
    this.redirectUrl = this.activeRoute.snapshot.queryParamMap.get('redirectUrl') || '/';
      // this.router.navigateByUrl('home');
  }
  onSubmit() {
    this.authService.login(this.loginForm).subscribe(() => {
      this.toastrService.success("Login done Successfully");
      this.router.navigateByUrl(this.redirectUrl);
    });
  }
}
