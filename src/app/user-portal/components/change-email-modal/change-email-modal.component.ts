import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user-service/user.service';
import  IUser from '../../interfaces/IUser';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToastrNotificationService } from '../../services/toastr/toastr.service';
import { PasswordValidatorService } from '../../../shared/services/password-validator/password-validator.service';
import { EmailValidatorService } from '../../../shared/services/email-validator/email-validator.service';

@Component({
  selector: 'app-change-email-modal',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, CommonModule, ReactiveFormsModule],
  providers: [UserService, ToastrNotificationService, PasswordValidatorService, EmailValidatorService],
  templateUrl: './change-email-modal.component.html',
  styleUrl: './change-email-modal.component.css'
})
export class ChangeEmailModalComponent {
  userForm! : FormGroup
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
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ChangeEmailModalComponent);

    dialogRef.afterClosed().subscribe(result => { // if not used, remove
    });
  }

  getFormValue() : void{
    this.userProfile.email = this.userForm.get('email')?.value;
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
    if (!this.emailValidator.isValidateEmail(this.userProfile.email as string)) {
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
    if (this.userForm.get('email')?.value == ''|| this.
    userForm.get('password')?.value == '') {
      return false;
    }

    return true;
  }

}
