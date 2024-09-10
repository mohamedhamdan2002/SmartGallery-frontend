import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../../pages/account/login/login.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    LoginComponent,
    FontAwesomeModule,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  authService = inject(AuthService);
  router = inject(Router);
  faCircleUser = faCircleUser
  faRightFromBracket = faRightFromBracket
  onLogoutBtnClicked() {
    this.authService.logout().subscribe(res => {
      console.log(res);
    })
  }
}
