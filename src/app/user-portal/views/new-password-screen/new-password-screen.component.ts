import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { InputPasswordComponent } from '../../../shared/components/input-password/input-password.component';
import { InputLoginComponent } from '../../../shared/components/input-login/input-login.component';
import { InputConfirmPasswordComponent } from '../../../shared/components/input-confirm-password/input-confirm-password.component';
import { ToastrNotificationService } from '../../services/toastr/toastr.service';
import { NewPasswordService } from '../../services/new-password/new-password.service';
import { ResetPasswordTokenService } from '../../../modules/authorization/ResetPasswordTokenService';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-new-password-screen',
  standalone: true,
  imports: [
    ButtonComponent,
    InputComponent,
    InputPasswordComponent,
    InputLoginComponent,
    ReactiveFormsModule,
    InputConfirmPasswordComponent],
  providers: [ToastrNotificationService, NewPasswordService, ResetPasswordTokenService],
  templateUrl: './new-password-screen.component.html',
  styleUrl: './new-password-screen.component.css'
})
export class NewPasswordScreenComponent {
  newPasswordForm!: FormGroup;
  token: string | null = null;
  constructor(
    private toastr: ToastrNotificationService,
    private newPasswordService: NewPasswordService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private resetPasswordTokenService: ResetPasswordTokenService
  ) {

    this.newPasswordForm = new FormGroup({
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
    });
  }


  submit() {
    
    if (!this.isValidForm()) {
      this.toastr.showWarning('Preencha todos os campos!', 'Warning');
      return;
    }

    if (!this.validatePasswords()) {
      return;
    }

    this.newPasswordService.newPassword(this.newPasswordForm.value.password, this.getToken())
    .toPromise()
    .then((response: HttpResponse<Object> | undefined) => {
      if (response?.status == 200 || response?.status == 201) {
        this.toastr.showSuccess('Nova senha cadastrada com sucesso','success');
        this.router.navigate(['/login']);
      }
    })
    .catch((error: HttpErrorResponse) => {

      if (error.status >= 400 && error.status < 500) {
        this.toastr.showError(error.error.error,'error');
      }

      if (error.status >= 500) {
        this.toastr.showError('Erro interno no servidor.','error');
      }
    });

  }

  isValidForm(): boolean {
    return (
      this.newPasswordForm.value.password !== '' &&
      this.newPasswordForm.value.confirmPassword !== ''
    );
  }

  isPasswordFormatValid(): boolean {
    const password = this.newPasswordForm.value.password;

    const passwordRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}$'
    );

    return passwordRegex.test(password);
  }

  validatePasswords(): boolean {

    if (!this.isPasswordFormatValid()) {
      this.showWarning('A senha deve conter ao menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial!');
      return false;
    }

    if (this.newPasswordForm.value.password !== this.newPasswordForm.value.confirmPassword) {
      this.showWarning('As senhas não conferem!');
      return false;
    }

    return true;
  }

  getToken(): string {

    const token = this.activatedRoute.snapshot.queryParams['ResetPasswordToken'];

    this.activatedRoute.queryParams.subscribe((params) => {
      this.token = params['ResetPasswordToken'];
    });

    return token;
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
}
