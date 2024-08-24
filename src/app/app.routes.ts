import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServicePageComponent } from './pages/service-page/service-page.component';
import { LoginComponent } from './pages/login/login.component';
import { ServiceDetailsComponent } from './pages/service-page/service-details/service-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'services', component: ServicePageComponent },
  { path: 'services/:id', component: ServiceDetailsComponent },
  { path: 'accounts/login', component: LoginComponent },
];
