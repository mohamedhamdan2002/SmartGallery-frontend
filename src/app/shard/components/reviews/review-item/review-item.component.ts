import { Component, Input } from '@angular/core';
import { Review } from '../../../models/Review';
import { RatingModule } from 'ngx-bootstrap/rating'
import { FormsModule, NgModel } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'review-item',
  standalone: true,
  imports: [
    RatingModule,
    FormsModule,
    DatePipe
  ],
  templateUrl: './review-item.component.html',
  styleUrl: './review-item.component.css'
})
export class ReviewItemComponent {
  @Input() review: Review = {} as Review;
}
