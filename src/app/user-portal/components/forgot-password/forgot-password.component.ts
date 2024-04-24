import { Component, EventEmitter, Output } from '@angular/core';
import { InputLoginComponent } from '../../../shared/components/input-login/input-login.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordService } from '../../services/forgot-password/forgot-password.service';
import { IEmail } from '../../interfaces/IEmail';
import { ToastrNotificationService } from '../../services/toastr/toastr.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [InputLoginComponent, ButtonComponent, ReactiveFormsModule],
  providers: [ForgotPasswordService, ToastrNotificationService],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  [x: string]: any;
  loginForm!: FormGroup<IEmail>;

  @Output('submit') onSubmit = new EventEmitter();

  constructor(
    private forgotPasswordService: ForgotPasswordService,
    private toastrNotificationService: ToastrNotificationService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
    });
  }

  public submit() {
    console.log(this.loginForm.value.email);
    this.sendEmail();
  }

  public sendEmail() {
    this.forgotPasswordService
      .forgotPassword(this.loginForm.value.email)
      .toPromise()
      .then((response: HttpResponse<Object> | undefined) => {
        if (response?.status == 200 || response?.status == 201) {
          this.toastrNotificationService.showSuccess(
            'Verifique seu email para redefinir sua senha.',
            'success'
          );
        }
      })
      .catch((error: any) => {
        if (error.status >= 400 && error.status < 500) {
          this.toastrNotificationService.showError(
            `${error.error.error}`,
            'error'
          );
        }
        if (error.status >= 500) {
          this.toastrNotificationService.showError(
            'Erro interno no servidor.',
            'error'
          );
        }
      });
  }
}
