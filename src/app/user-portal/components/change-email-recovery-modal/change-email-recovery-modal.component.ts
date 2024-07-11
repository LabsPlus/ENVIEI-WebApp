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
import { SessionStorageService } from '../../../shared/services/session-storage/session-storage.service';
import { PasswordEyeButtonComponent } from '../password-eye-button/password-eye-button.component';


@Component({
  selector: 'app-change-email-recovery-modal',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, CommonModule, ReactiveFormsModule, PasswordEyeButtonComponent],
  providers: [UserService, ToastrNotificationService, PasswordValidatorService, EmailValidatorService, SessionStorageService],
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
    private emailValidator: EmailValidatorService,
    private sessionStorageService: SessionStorageService,
  ) {

    this.accessToken = this.sessionStorageService.getSessionToken() as string;

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
    await this.userService
      .requestUpdateEmailRecovery(userProfileData, this.accessToken)
      .toPromise()
      .then(async (response: HttpResponse<IUser> | any) => {
        if (response?.status == 200 || response?.status == 201) {
          await this.toarstNotification.showSuccess('Email de recuperação atualizado com sucesso', 'Sucesso');
        }
      })
      .catch(async (error: HttpErrorResponse) => {

        await this.toarstNotification.showError('Erro ao atualizar dados', 'Erro');
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
