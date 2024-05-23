import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../../user-portal/views/login/login.component';
import { RegisterComponent } from '../../user-portal/views/register/register.component';
import { LandingPageComponent } from '../../user-portal/views/landing-page/landing-page.component';
import { NewPasswordScreenComponent } from '../../user-portal/views/new-password-screen/new-password-screen.component';
import { HomeComponent } from '../../user-portal/views/home/home.component';
import { ForgotPasswordComponent } from '../../user-portal/views/forgot-password/forgot-password.component';
import { DashboardComponent } from '../../user-portal/views/dashboard/dashboard.component';
import { authGuard } from '../../shared/services/guard/auth/auth.guard';
import { ProfileComponent } from '../../user-portal/views/home/profile/profile.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: LandingPageComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'home', canActivate: [authGuard], children: [
    { path: '', component: HomeComponent },
    { path: 'profile', component: ProfileComponent },
  ]
  },
  { path: 'new-password', component: NewPasswordScreenComponent },
 
];
