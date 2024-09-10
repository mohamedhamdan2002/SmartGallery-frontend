import { Component, inject, Input, OnInit } from '@angular/core';
import { Review } from '../../models/Review';
import { Observable } from 'rxjs';
import { ReviewService } from '../../../core/services/review.service';
import { AsyncPipe } from '@angular/common';
import { ReviewItemComponent } from './review-item/review-item.component';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    AsyncPipe,
    ReviewItemComponent
  ],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements OnInit {
  @Input() serviceId!: number;
  reviews$!: Observable<Review[]>;
  private readonly reviewService = inject(ReviewService);
  ngOnInit(): void {
    console.log(this.serviceId);
    if(this.serviceId)
      this.reviews$ = this.reviewService.getReviewsForService(this.serviceId);
  }


}
