import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService);
  return next(req).pipe(
    catchError((response: HttpErrorResponse) => {
      toastrService.error(response.error.message);
      return throwError(() => response.error);
    })
  );
};
