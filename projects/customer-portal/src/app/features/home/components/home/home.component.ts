import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel'
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  slides = [
    { image: 'assets/images/image-1.png', text: 'first'},
    { image: 'assets/images/image-4.png', text: 'second'},
    { image: 'assets/images/image-5.png', text: 'third'},
  ]
}
