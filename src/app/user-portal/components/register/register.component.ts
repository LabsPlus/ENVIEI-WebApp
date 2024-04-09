import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { InputPasswordComponent } from '../../../shared/components/input-password/input-password.component';
import { InputLoginComponent } from '../../../shared/components/input-login/input-login.component';
import { InputDoublePasswordComponent } from '../../../shared/components/input-double-password/input-double-password.component';
import { InputPhoneNumberComponent } from '../../../shared/components/input-phone-number/input-phone-number.component';
import { InputCpfCnpjComponent } from '../../../shared/components/input-cpf-cnpj/input-cpf-cnpj.component';
import { InputConfirmPasswordComponent } from '../../../shared/components/input-confirm-password/input-confirm-password.component';
import { FormControl, FormGroup, FormRecord, ReactiveFormsModule, Validators, ControlValueAccessor } from '@angular/forms';
import { RegisterService } from '../../services/register/register.service';
import { Router } from '@angular/router';
import IUser from '../../interfaces/IUser';
import { IRegisterData } from '../../../shared/interfaces/register/register-date-interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ButtonComponent, InputComponent, InputPasswordComponent,InputLoginComponent, InputPhoneNumberComponent,InputCpfCnpjComponent, ReactiveFormsModule, InputDoublePasswordComponent, InputConfirmPasswordComponent],
  providers: [RegisterService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
[x: string]: any;


  registerForm!: FormGroup<IRegisterData>;

  @Output("submit") onSubmit = new EventEmitter();
  @Output("navigate") onNavigate = new EventEmitter();


  constructor(private registerService: RegisterService, private router: Router) {

    this.registerForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      email_recovery: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
      cpf_cnpj: new FormControl(''),
      phone_number: new FormControl('')
    });


  }

  navigate(){
    this.onNavigate.emit();
  }

  submit() {
    if (this.isValidForm()) {
      this.registerUser();
    } else {
      alert('Formulário inválido');
    }
  }

  isValidForm(): boolean {
    return this.registerForm.value.name !== '' && this.registerForm.value.email !== '' && this.registerForm.value.password !== '' && this.registerForm.value.confirmPassword !== '' && this.registerForm.value.cpf_cnpj !== '' && this.registerForm.value.phone_number !== '';
  }

  validatePasswords(): boolean {
    return this.registerForm.value.password === this.registerForm.value.confirmPassword;
  }

  registerUser() {

    if (this.validatePasswords()) {
      const user = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        email_recovery: this.registerForm.value.email,
        password: this.registerForm.value.password,
        cpf_cnpj: this.registerForm.value.cpf_cnpj,
        phone_number: this.registerForm.value.phone_number
      };
      
      this.registerService.registerUser(user as any);

      this.router.navigate(['/login']);
      
    } else {
      alert('As senhas não coincidem');
    }
  }
  
}
