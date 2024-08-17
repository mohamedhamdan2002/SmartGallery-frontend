import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'star-rating',
  standalone: true,
  imports: [
    FontAwesomeModule
  ],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {
  faStar = faStar;
}
