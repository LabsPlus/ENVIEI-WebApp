import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { InputPasswordComponent } from '../../../shared/components/input-password/input-password.component';
import { InputLoginComponent } from '../../../shared/components/input-login/input-login.component';
import { InputConfirmPasswordComponent } from '../../../shared/components/input-confirm-password/input-confirm-password.component';
import { ToastrNotificationService } from '../../services/toastr/toastr.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validator,
} from '@angular/forms';


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
  providers: [ToastrNotificationService],
  templateUrl: './new-password-screen.component.html',
  styleUrl: './new-password-screen.component.css'
})
export class NewPasswordScreenComponent {
  newPasswordForm!: FormGroup;

  constructor(private toastr: ToastrNotificationService) {

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
      this.showError('As senhas não conferem!');
      return;
    }
    
    this.showSuccess('Senha alterada com sucesso!');

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