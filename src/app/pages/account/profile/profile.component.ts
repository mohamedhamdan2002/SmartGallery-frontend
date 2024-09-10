import { Component, inject, OnInit, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserPen } from '@fortawesome/free-solid-svg-icons'
import { AuthService } from '../../../core/services/auth.service';
import { UserProfile } from '../../../shard/models/UserProfile';
import { FormsModule } from '@angular/forms';
import {  CommonModule  } from '@angular/common';
import { Observable } from 'rxjs';
import { IReservation } from '../../../shard/models/Reservation';
import { CustomerReservationsComponent } from './customer-reservations/customer-reservations.component';
import { ReservationService } from '../../../core/services/reservation.service';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FontAwesomeModule,
    FormsModule,
    CommonModule,
    CustomerReservationsComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  isEdit = signal<boolean>(false);
  faUserPen = faUserPen;
  authService = inject(AuthService);
  profile: UserProfile = {} as UserProfile;
  reservationService = inject(ReservationService);
  reservations$!: Observable<IReservation[]>;
  ngOnInit(): void {
    this.loadUserProfile();
  }
  loadUserProfile() {
    this.authService.getUserProfile().subscribe(res => {
      this.profile = res;
    });
  }

}
