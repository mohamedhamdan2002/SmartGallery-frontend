import { Component, Input } from '@angular/core';
import { IService } from '../../../shard/models/service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-item',
  standalone: true,
  imports: [],
  templateUrl: './service-item.component.html',
  styleUrl: './service-item.component.css'
})
export class ServiceItemComponent {
  @Input() service!: IService
  constructor(private router: Router) {

  }
  onCardClicked() {
    this.router.navigate(['/services', this.service.id]);
  }
}
