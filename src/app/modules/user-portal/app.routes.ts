import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../../user-portal/components/login/login.component';
import { RegisterComponent } from '../../user-portal/components/register/register.component';
import { LandingPageComponent } from '../../user-portal/components/landing-page/landing-page.component';
import { ForgotPasswordComponent } from '../../user-portal/components/forgot-password/forgot-password.component';
import { HomeComponent } from '../../user-portal/components/home/home.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: LandingPageComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'home', component: HomeComponent },
];
