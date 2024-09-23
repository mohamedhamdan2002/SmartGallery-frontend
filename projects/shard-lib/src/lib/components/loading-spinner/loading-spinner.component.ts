import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'lib-loading-spinner',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.css'
})
export class LoadingSpinnerComponent implements OnInit {
  private loadingService = inject(LoadingService);
  isLoading: boolean = false;
  ngOnInit(): void {
    this.loadingService.loadingStatus$.subscribe(status => {
      this.isLoading = status;
    });
  }

}
