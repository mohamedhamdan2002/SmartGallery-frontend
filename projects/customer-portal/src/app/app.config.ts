import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { provideToastr } from 'ngx-toastr';
import { authInterceptor, errorHandlerInterceptor, loadingIndicatorInterceptor } from 'shardLib';

export const appConfig: ApplicationConfig = {
  providers: [
    MatDialogModule,
    provideToastr(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        loadingIndicatorInterceptor,
        errorHandlerInterceptor
      ])
    )
  ]
};
