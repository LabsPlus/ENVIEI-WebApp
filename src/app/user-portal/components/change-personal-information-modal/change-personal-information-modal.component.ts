import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import IUser from '../../interfaces/IUser';
import { UserService } from '../../services/user-service/user.service';
import { ToastrNotificationService } from '../../services/toastr/toastr.service';
import { NameValidatorService } from '../../../shared/services/name-validator/name-validator.service';
import { PasswordValidatorService } from '../../../shared/services/password-validator/password-validator.service';
import { PhoneNumberValidatorService } from '../../../shared/services/phone-number-validator/phone-number-validator.service';
import { SessionStorageService } from '../../../shared/services/session-storage/session-storage.service';
import { PasswordEyeButtonComponent } from '../password-eye-button/password-eye-button.component';

@Component({
  selector: 'app-change-personal-information-modal',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, ReactiveFormsModule, PasswordEyeButtonComponent],
  providers: [UserService, ToastrNotificationService, PasswordValidatorService, NameValidatorService, PhoneNumberValidatorService, SessionStorageService],
  templateUrl: './change-personal-information-modal.component.html',
  styleUrl: './change-personal-information-modal.component.css'
})

export class ChangePersonalInformationModalComponent {

  accessToken: string = '';
  userForm!: FormGroup;
  userProfile: IUser = {};
  password: string = '';

  constructor
    (
      public dialog: MatDialog, private userService: UserService,
      private toarstNotification: ToastrNotificationService,
      private passwordValidator: PasswordValidatorService,
      private nameValidator: NameValidatorService,
      private phoneNumberValidator: PhoneNumberValidatorService,
      private sessionStorageService: SessionStorageService
    ) {
      
      this.accessToken = this.sessionStorageService.getSessionToken() as string;

    this.userForm = new FormGroup({
      name: new FormControl(''),
      phone_number: new FormControl('', [Validators.required]),
      password: new FormControl(''),
    });

  }

  updateProfileData(userProfileData: IUser): void {

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

    this.getFormData();

    if (!this.isFormValid()) {
      this.toarstNotification.showError('Preencha todos os campos', 'Erro');
      return;
    }

    if (!this.nameValidator.validateName(this.userProfile.name as string)) {
      this.toarstNotification.showError('Nome inválido', 'Erro');
      return;
    }

    if (!this.phoneNumberValidator.isPhoneNumberValid(this.userProfile.phone_number as string)) {
      this.toarstNotification.showError('Telefone inválido', 'Erro');
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

    this.updateProfileData(this.userProfile);

    this.dialog.closeAll();

    this.refreshPage();

  }

  refreshPage(): void {
    window.location.reload();
  }

  openDialog() {

    const dialogRef = this.dialog.open(ChangePersonalInformationModalComponent);
    dialogRef.afterClosed().subscribe(result => { });

  }

  isFormValid(): boolean {
      
      if (this.userForm.get('name')?.value == '' || this.userForm.get('phone_number')?.value == '' || this.userForm.get('password')?.value == '') {
        return false;
      }
  
      return true;
  }

  getFormData(): void {

    this.userProfile.name = this.userForm.get('name')?.value;
    this.userProfile.phone_number = this.userForm.get('phone_number')?.value;
    this.password = this.userForm.get('password')?.value;

  }

}
