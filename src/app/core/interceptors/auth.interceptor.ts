import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiConstant } from '../constant/api.constant';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(AuthService).token;
  if(!authToken)
    return next(req);

  const reqWithToken = req.clone({
    headers: req.headers.append(ApiConstant.AUTH_HEADER, `${ApiConstant.AUTH_SCHEMA} ${authToken}`)
  });
  console.log(req.headers);
  return next(reqWithToken);
};
