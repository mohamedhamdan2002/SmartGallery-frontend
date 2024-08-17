import { Component } from '@angular/core';
import { StarRatingComponent } from '../../../shard/components/star-rating/star-rating.component';

@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [
    StarRatingComponent
  ],
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.css'
})
export class ServiceDetailsComponent {

}
