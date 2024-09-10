import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServicePageComponent } from './pages/service-page/service-page.component';
import { LoginComponent } from './pages/login/login.component';
import { ServiceDetailsComponent } from './pages/service-page/service-details/service-details.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LayoutComponent } from './pages/admin/layout/layout.component';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { ServicesComponent } from './pages/admin/services/services.component';
import { ServiceFormComponent } from './pages/admin/services/service-form/service-form.component';
import { ReservationsComponent } from './pages/admin/reservations/reservations.component';
import { UserLayoutComponent } from './shard/components/user-layout/user-layout.component';

export const routes: Routes = [
  {
    path:'', component: UserLayoutComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'services', component: ServicePageComponent },
      { path: 'services/:id', component: ServiceDetailsComponent },
      {
        path: 'accounts', children: [
          { path: 'login', component: LoginComponent },
          { path: 'profile', component: ProfileComponent }
        ]
      },
    ]
  },
  {
    path: "admin",
    component: LayoutComponent,
    children: [
      { path: 'categories', component: CategoriesComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'services/add', component: ServiceFormComponent },
      { path: 'services/edit/:id', component: ServiceFormComponent },
      { path: 'reservations', component: ReservationsComponent },
    ]
  }
];
