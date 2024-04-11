import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../../user-portal/components/login/login.component';
import { RegisterComponent } from '../../user-portal/components/register/register.component';
import  { LandingPageComponent } from '../../user-portal/components/landing-page/landing-page.component';
import { NewPasswordScreenComponent } from '../../user-portal/components/new-password-screen/new-password-screen.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '', component: LandingPageComponent},
    {path: 'new-password', component: NewPasswordScreenComponent}
];


