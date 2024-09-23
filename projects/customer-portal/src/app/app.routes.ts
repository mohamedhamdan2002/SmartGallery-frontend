import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/components/home/home.component';
import { ServiceListComponent } from './features/service/components/service-list/service-list.component';
import { ServiceDetailsComponent } from './features/service/components/service-details/service-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'services', component: ServiceListComponent },
  { path: 'services/:id', component: ServiceDetailsComponent }
];
