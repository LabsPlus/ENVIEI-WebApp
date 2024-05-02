import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../../user-portal/components/login/login.component';
import { RegisterComponent } from '../../user-portal/components/register/register.component';
import { LandingPageComponent } from '../../user-portal/components/landing-page/landing-page.component';
import { NewPasswordScreenComponent } from '../../user-portal/components/new-password-screen/new-password-screen.component';
import { HomeComponent } from '../../user-portal/components/home/home.component';
import { ForgotPasswordComponent } from '../../user-portal/components/forgot-password/forgot-password.component';
import { authGuard } from '../../shared/services/guard/auth/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', component: LandingPageComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'home', component: HomeComponent, canActivate: [authGuard]},
    { path: 'new-password', component: NewPasswordScreenComponent}
];



