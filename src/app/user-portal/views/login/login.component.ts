import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputLoginComponent } from '../../../shared/components/input-login/input-login.component';
import { InputPasswordComponent } from '../../../shared/components/input-password/input-password.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { ILoginData } from '../../../shared/interfaces/login-data/login-data.interfaces';
import { LoginService } from '../../services/login/login.service';
import { ToastrNotificationService } from '../../services/toastr/toastr.service';
import { SessionStorageService } from '../../../shared/services/session-storage/session-storage.service';
import { IToken } from '../../../shared/interfaces/Token/token.interfaces';
import { AuthenticatorService } from '../../../shared/services/auth/authenticator.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonComponent,
    InputComponent,
    InputPasswordComponent,
    InputLoginComponent,
    ReactiveFormsModule,
    RouterLink,
  ],
  providers: [LoginService, ToastrNotificationService, SessionStorageService, AuthenticatorService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  loginForm!: FormGroup<ILoginData>;
  stayConnected: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrNotificationService,
    private sessionStorageService: SessionStorageService,
    private authenticatorService: AuthenticatorService,

  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

  }

  submit() {
    if (!this.isValidForm()) {
      return;
    }
    if (!this.validatePasswords()) {
      return;
    }
    this.loginUser();
  }

  isValidForm(): any {
    if (
      this.loginForm.value.email == '' &&
      this.loginForm.value.password == ''
    ) {
      this.showError('Preencha os campos email e senha.');
      return false;
    }
    if (this.loginForm.value.email == '') {
      this.showError('Preencha o campo email.');
      return false;
    }
    if (this.loginForm.value.password == '') {
      this.showError('Preencha o campo senha.');
      return null;
    }
    return true;
  }


  stayConnectedSelected() {
    this.stayConnected = true; 
  }

  isPasswordFormatValid(): boolean {
    const password = this.loginForm.value.password;

    const passwordRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}$'
    );

    return passwordRegex.test(password);
  }

  validatePasswords(): boolean {
    if (!this.isPasswordFormatValid()) {
      this.showWarning(
        'A senha deve conter ao menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial!'
      );
      return false;
    }

    return true;
  }

  showSuccess(message: string) {
    this.toastr.showSuccess(message, 'Success', {
      timeOut: 5000,
      positionClass: 'toast-top-center',
      messageClass: 'toast-message',
      tapToDismiss: true,
      newestOnTop: true,
    });
  }

  showError(message: string) {
    this.toastr.showError(message, 'Failed', {
      timeOut: 5000,
      positionClass: 'toast-top-center',
      messageClass: 'toast-message',
      tapToDismiss: true,
      newestOnTop: true,
    });
  }

  showWarning(message: string) {
    this.toastr.showWarning(message, 'Warning', {
      timeOut: 5000,
      positionClass: 'toast-top-center',
      messageClass: 'toast-message',
      tapToDismiss: true,
      newestOnTop: true,
    });
  }

  showInfo(message: string) {
    this.toastr.showInfo(message, 'Info', {
      timeOut: 5000,
      positionClass: 'toast-top-center',
      messageClass: 'toast-message',
      tapToDismiss: true,
      newestOnTop: true,
    });
  }

  loginUser() {   
    this.authenticatorService
      .login(this.loginForm.value.email, this.loginForm.value.password, this.stayConnected)
      .then((response) => {
        if(response?.status == 200) {
          const token = response?.body?.token;
          if (token) {
            this.stayConnected ? this.sessionStorageService.createSessionWithStayConnectedMode(token) : this.sessionStorageService.createSessionWithNoStayConnectedMode(token);
          }
        }
        this.showSuccess('Login realizado com sucesso!');
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        error.error.message == 'Usuário não encontrado'
          ? this.showError('Email ou senha inválidos.')
          : null;
        error.error.message == 'Senha inválida'
          ? this.showError('Email ou senha inválidos.')
          : null;
      });
  }

}
