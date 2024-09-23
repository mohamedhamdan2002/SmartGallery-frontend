import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, ConfirmDialogComponent, MaterialModule } from 'shardLib'
import { DialogService } from '../../dialog.service';
import { LoginComponent } from '../../../features/account/login/login.component';
import { RegisterComponent } from '../../../features/account/register/register.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    // LoginComponent,
    // FontAwesomeModule,
    CommonModule,
    MaterialModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authService = inject(AuthService);
  router = inject(Router);
  private dialogService = inject(DialogService)
  onLogoutBtnClicked() {
    const initialState = {
      title: "Logout",
      message: `are you sure you want to logout ?`
    }
    const ref = this.dialogService.openModal(ConfirmDialogComponent, initialState)
    ref.afterClosed().subscribe(res => {
      if(res) {
        this.authService.logout().subscribe(res => {
          console.log(res);
        });
      }
    });
  }
  openLoginDialog() {
    this.dialogService.openModal(LoginComponent);
  }
  openRegisterDialog() {
    this.dialogService.openModal(RegisterComponent);
  }
}
