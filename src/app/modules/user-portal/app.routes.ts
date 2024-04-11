import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../../user-portal/components/login/login.component';
import { RegisterComponent } from '../../user-portal/components/register/register.component';
import { LandingPageComponent } from '../../user-portal/components/landing-page/landing-page.component';
import { ForgotPasswordComponent } from '../../user-portal/components/forgot-password/forgot-password.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: LandingPageComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
];
