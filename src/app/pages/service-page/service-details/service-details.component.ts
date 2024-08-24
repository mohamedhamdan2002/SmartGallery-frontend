import { Component, TemplateRef } from '@angular/core';
import { StarRatingComponent } from '../../../shard/components/star-rating/star-rating.component';
import { ServiceReservationFormComponent } from '../service-reservation-form/service-reservation-form.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
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
  constructor(private modalService: BsModalService) {

  }
  openModal(templateRef: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templateRef);
  }
}
