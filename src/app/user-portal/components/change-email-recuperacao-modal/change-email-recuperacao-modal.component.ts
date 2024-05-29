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
  selector: 'app-change-email-recuperacao-modal',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, CommonModule, ReactiveFormsModule],
  providers: [UserService, ToastrNotificationService, PasswordValidatorService, EmailValidatorService],
  templateUrl: './change-email-recuperacao-modal.component.html',
  styleUrl: './change-email-recuperacao-modal.component.css'
})
export class ChangeEmailRecuperacaoModalComponent {
  userForm!: FormGroup
  userProfile: IUser = {};
  acessToken: string = '';
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
    const dialogRef = this.dialog.open(ChangeEmailRecuperacaoModalComponent);

    dialogRef.afterClosed().subscribe(result => {
    });
  }



  updateProfileData(): void {
    this.userService
      .updateUser(this.userProfile, this.acessToken)
      .toPromise()
      .then((response: HttpResponse<IUser> | any) => {
        if (response?.status == 200 || response?.status == 201) {
          this.userProfile.name = response.body.name;
          this.userProfile.email = response.body.email;
          this.userProfile.profile_photo = response.body.profile_photo;
          this.userProfile.email_recovery = response.body.email_recovery;
          this.userProfile.cpf_cnpj = response.body.cpf_cnpj;
          this.userProfile.phone_number = response.body.phone_number;
        }
      })
      .catch((error: HttpErrorResponse) => {
        console.error(error);
      });

  }
  getFormValue(): void {
    this.userProfile.email_recovery= this.userForm.get('email_recovery')?.value;
    this.password = this.userForm.get('password')?.value;
  }

  getToken(): void {
    if (sessionStorage.getItem('accessToken') == null) {
      this.acessToken = '';
      return;
    }
    this.acessToken = sessionStorage.getItem('accessToken') as string;
  }
  updateEmail(userProfileData: IUser): void {
    this.userService
      .updateUser(userProfileData, this.acessToken)
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
      .validateUserPassword(password, this.acessToken)
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
    this.getFormValue();
  
    if (!this.isFormValid()) {
      this.toarstNotification.showError('Preencha todos os campos', 'Erro');
      return;
    }
    if (!this.emailValidator.isValidateEmail(this.userProfile.email_recovery as string)) {
      this.toarstNotification.showError('Email inválido', 'Erro');
      return;
    }
    if (!this.passwordValidator.isPasswordFormatValid(this.password)) {
      this.toarstNotification.showError('Senha inválida', 'Erro');
      return;
    }
    if (!await this.validateUserPassword(this.password)) {
      this.toarstNotification.showError('Senha inválida', 'Erro');
      return;
    }
    this.updateEmail(this.userProfile);
    this.dialog.closeAll();
    this.refreshPage();
  }

  refreshPage(): void {
    window.location.reload();
  }

  isFormValid(): boolean {
    if (this.userForm.get('email_recovery')?.value == '' || this.userForm.get('password')?.value == '') {
      return false;
    }

    return true;
  }
}
