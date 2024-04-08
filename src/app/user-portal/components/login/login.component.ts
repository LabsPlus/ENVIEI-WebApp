import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { InputPasswordComponent } from '../../../shared/components/input-password/input-password.component';
import { InputLoginComponent } from '../../../shared/components/input-login/input-login.component';
import { LoginService } from '../../services/login/login.service';
import { ILoginData } from '../../../shared/interfaces/login-data/login-data.interfaces';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonComponent,
    InputComponent,
    InputPasswordComponent,
    InputLoginComponent,
    ReactiveFormsModule,
  ],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup<ILoginData>;

  constructor(private loginService: LoginService) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  submit() {
    console.log('Login form submitted');

    this.loginService
      .login({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      })
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
