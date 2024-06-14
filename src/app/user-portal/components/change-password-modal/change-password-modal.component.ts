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
import { StayConnectedService } from '../../services/stay-connected/stay-connected.service';


@Component({
  selector: 'app-change-password-modal',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, CommonModule, ReactiveFormsModule],
  providers: [UserService, ToastrNotificationService, PasswordValidatorService, EmailValidatorService],
  templateUrl: './change-password-modal.component.html',
  styleUrl: './change-password-modal.component.css'
})
export class ChangePasswordModalComponent implements  OnInit{
  userForm! : FormGroup
  userProfile: any = {};
  accessToken: string = '';
  password: string = '';
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
    private stayConnectedService: StayConnectedService
  ) {}

  ngOnInit(): void {
    this.accessToken = this.stayConnectedService.getAccessToken() as string;
  
    this.userForm = new FormGroup({
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
      currentPassword: new FormControl(''),
    });
  
    this.userForm.get('password')?.valueChanges.subscribe(value => {
      this.validatePasswordStrength(value);
    });
  }

  validatePasswordStrength(password: string): void | boolean {
    const minLength = 8;
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    this.strengths.minLength = password.length >= minLength;
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

  getFormValue() : void{
    this.userProfile.password = this.userForm.get('password')?.value;
    this.userProfile.confirmPassword = this.userForm.get('confirmPassword')?.value;
    this.password = this.userForm.get('currentPassword')?.value;
  }

  isFormValid(): boolean {
    if (this.userForm.get('password')?.value == ''|| this.
    userForm.get('confirmPassword')?.value == '' || this.userForm.get('currentPassword')?.value == ''){
      return false;
    }
    return true;
  }

  validateConfirmPassword(): boolean {
    const confirmPassword = this.userForm.get('confirmPassword')?.value;
    const password = this.userForm.get('password')?.value;
    if (confirmPassword !== password) {
      return false;
    } 
    return true;
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

  updatePassword(userProfileData: IUser): void {
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

  async submit(): Promise<void> {
    this.getFormValue();
    
    //validating all fields are filled
    if (!this.isFormValid()) {
      this.toarstNotification.showError('Preencha todos os campos', 'Erro');
      return;
    } 

    //validating password strength
    if (!this.validatePasswordStrength(this.userProfile.password)) {
      this.toarstNotification.showError("A senha não segue as diretrizes de segurança necessárias.",'Erro');
      return;
    }
  
    //validating if password and confirm password are the same
    if (!this.validateConfirmPassword()) {
      this.toarstNotification.showError('As senhas não coincidem', 'Erro');
      return;
    }

     //validating if password is valid
     if (!this.passwordValidator.isPasswordFormatValid(this.userProfile.password)) {
      this.toarstNotification.showError('Senha inválida', 'Erro');
      return;
    }
   
    //validating if password is from the user
    if (!await this.validateUserPassword(this.password)) {
      this.toarstNotification.showError('Senha inválida', 'Erro');
      return;
    }

    this.updatePassword({password:this.userProfile.password});
    this.dialog.closeAll();
    this.refreshPage();
  }

  refreshPage(): void {
    window.location.reload();
  }
}
