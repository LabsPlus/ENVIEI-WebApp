import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user-service/user.service';
import IUser from '../../interfaces/IUser';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ToastrNotificationService } from '../../services/toastr/toastr.service';
import { PasswordValidatorService } from '../../../shared/services/password-validator/password-validator.service';
import { NameValidatorService } from '../../../shared/services/name-validator/name-validator.service';
import { PhoneNumberValidatorService } from '../../../shared/services/phone-number-validator/phone-number-validator.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-personal-information-modal',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, ReactiveFormsModule],
  providers: [UserService, ToastrNotificationService, PasswordValidatorService, NameValidatorService, PhoneNumberValidatorService ],
  templateUrl: './change-personal-information-modal.component.html',
  styleUrl: './change-personal-information-modal.component.css'
})
export class ChangePersonalInformationModalComponent {

  userForm! : FormGroup;

  constructor
  (
    public dialog: MatDialog, private userService: UserService, 
    private toarstNotification: ToastrNotificationService, 
    private passwordValidator: PasswordValidatorService, 
    private nameValidator: NameValidatorService,
    private phoneNumberValidator: PhoneNumberValidatorService
  ) { 
    this.getToken();

    this.userForm = new FormGroup({
      name: new FormControl(''),
      phone_number: new FormControl('', [Validators.required]),
      password: new FormControl(''),
    });

  }

  openDialog() {
    const dialogRef = this.dialog.open(ChangePersonalInformationModalComponent);

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  userProfile: IUser = {};
  acessToken: string = '';


  getFormData(): void {

    this.userProfile.name = this.userForm.get('name')?.value;
    this.userProfile.phone_number = this.userForm.get('phone_number')?.value;
    this.userProfile.password = this.userForm.get('password')?.value;
  
  }
  
  updateProfileData(userProfileData: IUser): void {

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

  validateUserPassword(password: string): Promise<boolean> {

    return this.userService
      .validateUserPassword(password, this.acessToken)
      .toPromise()
      .then((response: HttpResponse<any> | undefined) => {

        if (response?.body.isValidPassword == true) {
          return true;
        }

        if (response?.body.isValidPassword == false) {
          this.toarstNotification.showError('Senha inválida', 'Erro');
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

  getToken(): void {

    if (sessionStorage.getItem('accessToken') == null) {
      this.acessToken = '';
      return;
    }

    this.acessToken = sessionStorage.getItem('accessToken') as string;

  }


  async submit(): Promise<void> {
    
    this.getFormData();
    
    if (!this.nameValidator.validateName(this.userProfile.name as string)) {
      this.toarstNotification.showError('Nome inválido', 'Erro');
      return;
    }

    if (!this.phoneNumberValidator.isPhoneNumberValid(this.userProfile.phone_number as string)) {
      this.toarstNotification.showError('Telefone inválido', 'Erro');
      return;
    }

    if (!this.passwordValidator.isPasswordFormatValid(this.userProfile.password as string)) {
      this.toarstNotification.showError('Senha inválida', 'Erro');
      return;
    }

    if (!await this.validateUserPassword(this.userProfile.password as string)) {
      this.toarstNotification.showError('Senha inválida', 'Erro');
      return;
    }

    this.updateProfileData(this.userProfile);

    this.dialog.closeAll();

    this.refresh();

  }

  refresh(): void {
    window.location.reload();
  }

}
