import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { StarRatingComponent } from '../../../shard/components/star-rating/star-rating.component';
import { ServiceReservationFormComponent } from '../service-reservation-form/service-reservation-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ServiceService } from '../../../core/services/service.service';
import { IService } from '../../../shard/models/service';
import { ModalService } from '../../../shard/modal.service';
import { ReviewService } from '../../../core/services/review.service';
import { ReviewsComponent } from '../../../shard/components/reviews/reviews.component';
@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [
    ServiceReservationFormComponent,
    ReviewsComponent,
  ],
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.css',
})
export class ServiceDetailsComponent implements OnInit{
  service: IService = {} as IService;
  private router = inject(Router);
  private authService = inject(AuthService);
  private modalService = inject(ModalService);
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
      this.modalService.openModal(ServiceReservationFormComponent, { id: this.service.id });
    else {
      const currentUrl = this.router.routerState.snapshot.url;
      this.router.navigate(['/accounts/login'], { queryParams: { redirectUrl: currentUrl }});
    }
  }
}
