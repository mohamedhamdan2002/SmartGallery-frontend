import { Component, Input } from '@angular/core';

import { Router } from '@angular/router';
import { Service } from '../../models/service';

@Component({
  selector: 'app-service-item',
  standalone: true,
  imports: [],
  templateUrl: './service-item.component.html',
  styleUrl: './service-item.component.scss'
})
export class ServiceItemComponent {
  @Input() service!: Service
  constructor(private router: Router) {

  }
  onCardClicked() {
    this.router.navigate(['/services', this.service.id]);
  }
}
