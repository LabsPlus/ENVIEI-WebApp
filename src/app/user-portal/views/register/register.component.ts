import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputConfirmPasswordComponent } from '../../../shared/components/input-confirm-password/input-confirm-password.component';
import { InputCpfCnpjComponent } from '../../../shared/components/input-cpf-cnpj/input-cpf-cnpj.component';
import { InputDoublePasswordComponent } from '../../../shared/components/input-double-password/input-double-password.component';
import { InputLoginComponent } from '../../../shared/components/input-login/input-login.component';
import { InputPasswordComponent } from '../../../shared/components/input-password/input-password.component';
import { InputPhoneNumberComponent } from '../../../shared/components/input-phone-number/input-phone-number.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { IRegisterData } from '../../../shared/interfaces/register/register-date-interface';
import { ToastrNotificationService } from '../../../user-portal/services/toastr/toastr.service';
import { RegisterService } from '../../services/register/register.service';
import { CpfValidatorService } from '../../../shared/services/cpf-validator/cpf-validator.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NameValidatorService } from '../../../shared/services/name-validator/name-validator.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ButtonComponent,
    InputComponent,
    InputPasswordComponent,
    InputLoginComponent,
    InputPhoneNumberComponent,
    InputCpfCnpjComponent,
    ReactiveFormsModule,
    InputDoublePasswordComponent,
    InputConfirmPasswordComponent,

  ],
  providers: [RegisterService, ToastrService, ToastrNotificationService, CpfValidatorService, NameValidatorService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  [x: string]: any;

  registerForm!: FormGroup<IRegisterData>;

  @Output('submit') onSubmit = new EventEmitter();
  @Output('navigate') onNavigate = new EventEmitter();

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private toastr: ToastrNotificationService,
    private identificationNumberValidator: CpfValidatorService,
    private nameValidator: NameValidatorService
  ) {
    this.registerForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      email_recovery: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
      cpf_cnpj: new FormControl(''),
      phone_number: new FormControl(''),
    });
  }

  navigate() {
    this.onNavigate.emit();
  }

  submit() {
    if (this.isValidForm()) {
      this.registerUser();
    } else {
      this.toastr.showWarning('Preencha todos os campos!', 'Warning');
    }
  }

  isValidForm(): boolean {
    return (
      this.registerForm.value.name !== '' &&
      this.registerForm.value.email !== '' &&
      this.registerForm.value.password !== '' &&
      this.registerForm.value.confirmPassword !== '' &&
      this.registerForm.value.cpf_cnpj !== '' &&
      this.registerForm.value.phone_number !== ''
    );
  }

  isPasswordFormatValid(): boolean {
    const password = this.registerForm.value.password;

    const passwordRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}$'
    );

    return passwordRegex.test(password);
  }

  emailHasValidFormat(email: string): boolean {
    
    const emailRegex = new RegExp(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    );

    return emailRegex.test(email);

  }

  validatePasswords(): boolean {

    if (!this.isPasswordFormatValid()) {
      this.showWarning('A senha deve conter ao menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial!');
      return false;
    }

    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.showWarning('As senhas não conferem!');
      return false;
    }

    return true;
  }

  validateCpfCnpj(): boolean {
    const cpfCnpj = this.registerForm.value.cpf_cnpj;

    if(this.identificationNumberValidator.validateCpfOrCnpj(cpfCnpj)) {
      return true;
    }

    const isCpf = cpfCnpj.replace(/[^\d]+/g, '').length <= 11;

    if(isCpf) {
      this.showWarning('CPF inválido!');
    } else {
      this.showWarning('CNPJ inválido!');
    }

    return false;
  }

  isNameValid(): boolean {
    return this.nameValidator.validateName(this.registerForm.value.name);
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

  registerUser() {

    if (!this.isValidForm()) {
      this.showError('Verifique se os dados inseridos estão corretos!');
      return;
    }

    if (!this.validatePasswords()) {
      return;
    }

    const user = this.getFormData();

    if (!this.validateCpfCnpj()) {
      return;
    }

    if (!this.emailHasValidFormat(user.email)) {

      this.showWarning('E- mail inválido. Por favor, insira um e-mail válido.');
      return;
    }

    if(!this.isNameValid()) {
      this.showWarning('Nome inválido. Por favor, insira um nome válido.');
      return;
    }
    
    this.registerService.registerUser(user)
    .toPromise()
    .then((response: HttpResponse<Object | any> | undefined) => {
      
      if (response?.status == 200 || response?.status == 201) {
        this.toastr.showSuccess('Usuario cadastrado com sucesso','success');
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

  getFormData(): any {
    const user = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      email_recovery: this.registerForm.value.email,
      password: this.registerForm.value.password,
      cpf_cnpj: this.registerForm.value.cpf_cnpj,
      phone_number: this.registerForm.value.phone_number,
    };
    return user;
  }
}
