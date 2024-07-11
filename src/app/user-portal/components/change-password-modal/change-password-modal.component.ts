import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user-service/user.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToastrNotificationService } from '../../services/toastr/toastr.service';
import { PasswordValidatorService } from '../../../shared/services/password-validator/password-validator.service';
import { EmailValidatorService } from '../../../shared/services/email-validator/email-validator.service';
import IUser from '../../interfaces/IUser';
import { SessionStorageService } from '../../../shared/services/session-storage/session-storage.service';
import { StayConnectedService } from '../../services/stay-connected/stay-connected.service';
import { PasswordEyeButtonComponent } from '../password-eye-button/password-eye-button.component';


@Component({
  selector: 'app-change-password-modal',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, CommonModule, ReactiveFormsModule, PasswordEyeButtonComponent],
  providers: [UserService, ToastrNotificationService, PasswordValidatorService, EmailValidatorService, SessionStorageService],
  templateUrl: './change-password-modal.component.html',
  styleUrl: './change-password-modal.component.css'
})
export class ChangePasswordModalComponent implements OnInit {
  userForm!: FormGroup
  userProfile: any = {};
  accessToken: string = '';
  currentPassword: string = '';
  strengths = {
    hasLowerCase: false,
    hasUpperCase: false,
    hasNumber: false,
    minLength: false,
  };

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private toarstNotification: ToastrNotificationService,
    private passwordValidator: PasswordValidatorService,
    private sessionStorageService: SessionStorageService,
  ) {}

  ngOnInit(): void {
    this.accessToken = this.sessionStorageService.getSessionToken() as string;
    this.userForm = new FormGroup({
      currentPassword: new FormControl(''),
      confirmNewPassword: new FormControl(''),
      newPassword: new FormControl(''),
    });

      this.userForm.get('newPassword')?.valueChanges.subscribe(value => {
      this.validatePasswordStrength(value);
    });
    
  }

  validatePasswordStrength(newPassword: string): boolean {

    const minLength = 8;
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);

    this.strengths.minLength = newPassword.length >= minLength;
    this.strengths.hasLowerCase = hasLowerCase;
    this.strengths.hasUpperCase = hasUpperCase;
    this.strengths.hasNumber = hasNumber;

    return Object.values(this.strengths).every(value => value === true);
  }


  openDialog() {
    const dialogRef = this.dialog.open(ChangePasswordModalComponent);

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  async getFormValue(): Promise<void> {
    this.userProfile.newPassword = this.userForm.get('newPassword')?.value as string;
    this.userProfile.confirmNewPassword = this.userForm.get('confirmNewPassword')?.value as string;
    this.currentPassword = this.userForm.get('currentPassword')?.value as string;

  }

  async isFormValid(): Promise<boolean> {
    if (this.userForm.get('currentPassword')?.value === '' || this.
      userForm.get('confirmNewPassword')?.value === '' || this.userForm.get('newPassword')?.value === '') {
      return false;
    }
    return true;
  }

  async validateConfirmPassword(): Promise<boolean>{

    if (this.userProfile.newPassword === this.userProfile.confirmNewPassword) {
      return true;
    }
    return false;
  }

  async validateUserPassword(currentPassword: string): Promise<boolean> {
    return await this.userService
      .validateUserPassword(currentPassword, this.accessToken)
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


  async updatePassword(userProfileData: IUser): Promise<void> {
    await this.userService
      .updateUser(userProfileData, this.accessToken)
      .toPromise()
      .then((response: HttpResponse<Object | any> | undefined) => {
        if (response?.status == 200 || response?.status == 201) {
          this.toarstNotification.showSuccess('Senha Atualizada Com Sucesso', 'Sucesso');
        }
      })
      .catch((error: HttpErrorResponse) => {
        this.toarstNotification.showError('Erro ao atualizar dados', 'Erro');
        console.error(error);
      });
  }

  async submit(): Promise<void> {
    
   this.getFormValue();

    //validating all fields are filled
    if (!await this.isFormValid()) {
      this.toarstNotification.showError('Preencha todos os campos', 'Erro');
      return;
    }

    //validating if password is from the user
    if (!await this.validateUserPassword(this.currentPassword)) {
      this.toarstNotification.showError('Senha atual está incorreta', 'Erro');
      return;
    }

    //validating if password and confirm password are the same
    if (!await this.validateConfirmPassword()) {
      this.toarstNotification.showError('As senhas não coincidem', 'Erro');
      return;
    }

    //validating password strength
    if (!this.validatePasswordStrength(this.userProfile.newPassword)) {
      this.toarstNotification.showError("A senha não segue as diretrizes de segurança necessárias.", 'Erro');
      return;
    }

    //validating if password is valid
    if (!await this.passwordValidator.isPasswordFormatValid(this.userProfile.newPassword)) {
      this.toarstNotification.showError('Nova senha tem formato inválida', 'Erro');
      return;
    }

    await this.updatePassword({ password: this.userProfile.newPassword });
    this.dialog.closeAll();
    this.refreshPage();
  }

  refreshPage(): void {
    window.location.reload();
  }
}
