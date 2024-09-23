import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingStatusSub = new BehaviorSubject<boolean>(false);
  loadingStatus$ = this.loadingStatusSub.asObservable();
  constructor() { }

  active() {
    this.dismiss(true);
  }
  dismiss(active: boolean = false) {
    this.loadingStatusSub.next(active);
  }
}
