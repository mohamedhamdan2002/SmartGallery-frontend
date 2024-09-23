import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../../../../shard/dialog.service';
import {
  Service,
  AuthService,
  ServiceService
} from 'shardLib';
import { ReservationFormComponent } from '../../../reservation/components/reservation-form/reservation-form.component';
import { LoginComponent } from '../../../account/login/login.component';
@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [
  ],
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.scss',
})
export class ServiceDetailsComponent implements OnInit{
  service: Service = {} as Service;
  // private router = inject(Router);
  private authService = inject(AuthService);
  private dialogService = inject(DialogService);
  private serviceService = inject(ServiceService);
  private activatedRoute = inject(ActivatedRoute);
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) {
      this.serviceService.getServiceById(+id).subscribe(res => {
        this.service = res;
      })
    }
  }

  openModal() {
    if(this.authService.isUserLogIn)
      this.dialogService.openModal(ReservationFormComponent, { id: this.service.id });
    else {
      // const currentUrl = this.router.routerState.snapshot.url;
      const ref = this.dialogService.openModal(LoginComponent);
      ref.afterClosed().subscribe(res => {
        if(res) {
          this.dialogService.openModal(ReservationFormComponent, { id: this.service.id });
        }
      });
      // this.router.navigate(['/accounts/login'], { queryParams: { redirectUrl: currentUrl }});
    }
  }
}
