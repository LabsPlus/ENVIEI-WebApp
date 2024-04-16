import { Component } from '@angular/core';
import { InputLoginComponent } from '../../../shared/components/input-login/input-login.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordService } from '../../services/forgot-password/forgot-password.service';
import { IEmail } from '../../interfaces/IEmail';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [InputLoginComponent, ButtonComponent, ReactiveFormsModule],
  providers: [ForgotPasswordService],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  loginForm!: FormGroup<IEmail>;

  constructor(private forgotPasswordService: ForgotPasswordService) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
    });
  }

  public submit() {
    console.log(this.loginForm.value.email);
    this.forgotPasswordService.forgotPassword(this.loginForm.value.email);
  }
}
