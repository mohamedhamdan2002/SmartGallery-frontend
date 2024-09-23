import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { delay, finalize } from 'rxjs';

export const loadingIndicatorInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.active();
  return next(req).pipe(
    delay(300),
    finalize(() => loadingService.dismiss())
  );
};
