import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserService } from '../../services/user-service/user.service';
import { MatButtonModule } from '@angular/material/button';
import IUser from '../../interfaces/IUser';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToastrNotificationService } from '../../services/toastr/toastr.service';
import { PasswordValidatorService } from '../../../shared/services/password-validator/password-validator.service';
import { EmailValidatorService } from '../../../shared/services/email-validator/email-validator.service';

@Component({
  selector: 'app-change-email-recovery-modal',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, CommonModule, ReactiveFormsModule],
  providers: [UserService, ToastrNotificationService, PasswordValidatorService, EmailValidatorService],
  templateUrl: './change-email-recovery-modal.component.html',
  styleUrl: './change-email-recovery-modal.component.css'
})
export class ChangeEmailRecoveryModalComponent {

  userForm!: FormGroup
  userProfile: IUser = {};
  accessToken: string = '';
  password: string = '';

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private toarstNotification: ToastrNotificationService,
    private passwordValidator: PasswordValidatorService,
    private emailValidator: EmailValidatorService
  ) {

    this.getToken();

    this.userForm = new FormGroup({
      email_recovery: new FormControl(''),
      password: new FormControl('')
    });
  }


  openDialog() {
    const dialogRef = this.dialog.open(ChangeEmailRecoveryModalComponent);
    dialogRef.afterClosed().subscribe(result => { });
  }


  getFormValue(): void {
    this.userProfile.email_recovery = this.userForm.get('email_recovery')?.value;
    this.password = this.userForm.get('password')?.value;
  }

  getToken(): void {
    if (sessionStorage.getItem('accessToken') == null) {
      this.accessToken = '';
      return;
    }
    this.accessToken = sessionStorage.getItem('accessToken') as string;
  }

  async isFormValid(): Promise<boolean> {

    this.getFormValue();

    if (this.userForm.get('email_recovery')?.value == '' || this.userForm.get('password')?.value == '') {
      this.toarstNotification.showError('Preencha todos os campos', 'Erro');
      return false;
    }

    if (!this.emailValidator.isValidateEmail(this.userProfile.email_recovery as string)) {
      this.toarstNotification.showError('Email inválido', 'Erro');
      return false;
    }

    if (!this.passwordValidator.isPasswordFormatValid(this.password)) {
      this.toarstNotification.showError('Senha inválida', 'Erro');
      return false;
    }

    if (!await this.validateUserPassword(this.password)) {
      this.toarstNotification.showError('Senha inválida', 'Erro');
      return false;
    }

    return true;
  }

  async updateEmailRecovery(userProfileData: IUser): Promise<void> {
    this.userService
      .updateUser(userProfileData, this.accessToken)
      .toPromise()
      .then((response: HttpResponse<IUser> | any) => {
        if (response?.status == 200 || response?.status == 201) {
          this.toarstNotification.showSuccess('Dados atualizados com sucesso', 'Sucesso');
        }
      })
      .catch((error: HttpErrorResponse) => {
        this.toarstNotification.showError('Erro ao atualizar dados', 'Erro');
        console.error(error);
      });
  }

  async validateUserPassword(password: string): Promise<boolean> {
    return await this.userService
      .validateUserPassword(password, this.accessToken)
      .toPromise()
      .then((response: HttpResponse<any> | undefined) => {

        if (response?.body.isValidPassword == true) {
          return true;
        }

        if (response?.body.isValidPassword == false) {
          return false;
        }

        return false;

      })
      .catch((error: HttpErrorResponse) => {

        this.toarstNotification.showError('Erro ao validar senha', 'Erro');
        console.error(error);
        return false;
      });
  }

  async submit(): Promise<void> {

    if (!await this.isFormValid()) {
      this.toarstNotification.showError('Formulario Invalido', 'Erro');
      return;
    }

    await this.updateEmailRecovery(this.userProfile);
    this.dialog.closeAll();
    this.refreshPage();

  }

  refreshPage(): void {
    window.location.reload();
  }

}
