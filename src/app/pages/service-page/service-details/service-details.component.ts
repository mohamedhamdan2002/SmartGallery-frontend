import { Component, inject, TemplateRef } from '@angular/core';
import { StarRatingComponent } from '../../../shard/components/star-rating/star-rating.component';
import { ServiceReservationFormComponent } from '../service-reservation-form/service-reservation-form.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [
    StarRatingComponent,
    ServiceReservationFormComponent
  ],
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.css',
  providers: [BsModalService]
})
export class ServiceDetailsComponent {
  modalRef?: BsModalRef;
  private router = inject(Router);
  private authService = inject(AuthService);
  private modalService = inject(BsModalService);

  openModal(templateRef: TemplateRef<any>) {
    if(this.authService.isUserLogIn)
      this.modalRef = this.modalService.show(templateRef);
    else {
      const currentUrl = this.router.routerState.snapshot.url;
      this.router.navigate(['/accounts/login'], { queryParams: { redirectUrl: currentUrl }});
    }
  }
}
