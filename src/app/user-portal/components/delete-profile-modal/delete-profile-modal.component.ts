import { Component } from '@angular/core';
import { UserService } from '../../services/user-service/user.service';
import { MatButtonModule } from '@angular/material/button';
import IUser from '../../interfaces/IUser';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToastrNotificationService } from '../../services/toastr/toastr.service';
import { PasswordValidatorService } from '../../../shared/services/password-validator/password-validator.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-delete-profile-modal',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, CommonModule, ReactiveFormsModule],
  providers: [UserService, ToastrNotificationService, PasswordValidatorService],
  templateUrl: './delete-profile-modal.component.html',
  styleUrl: './delete-profile-modal.component.css'
})
export class DeleteProfileModalComponent {
  
  userForm!: FormGroup
  userProfile: IUser = {};
  accessToken: string = '';
  password: string = '';

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private toarstNotification: ToastrNotificationService,
    private passwordValidator: PasswordValidatorService,
    private router : Router,
  ) {
    this.getToken();

    this.userForm = new FormGroup({
      password: new FormControl('')
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(DeleteProfileModalComponent);
    dialogRef.afterClosed().subscribe(result => { });
  }

  getFormValue(): void {
    this.password = this.userForm.get('password')?.value;
  }

  getToken(): void {
    
    this.accessToken = sessionStorage.getItem('accessToken') as string;
    
  }

  async isFormValid(): Promise<boolean> {

    this.getFormValue();

    if (!this.passwordValidator.isPasswordFormatValid(this.password)) {
      this.toarstNotification.showError('Senha inválida', 'Erro');
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

  async deleteProfile(): Promise<void> {
    await this.userService
      .scheduleUserDeletion(this.accessToken as string)
      .toPromise()
      .then(async (response: HttpResponse<IUser> | any) => {
        if (response?.status == 200 || response?.status == 201) {
          await this.toarstNotification.showSuccess('O perfil está em processo de exclusão', 'Sucesso');

          console.log(response)
        }
      })
      .catch(async (erro: HttpErrorResponse) => {
        await this.toarstNotification.showError('Erro ao deletar perfil', 'Erro')
        console.log(erro)
      });
  }

  async submit(): Promise<void> {
    console.log('entreii')
    if (!await this.isFormValid()) {
      this.toarstNotification.showError('Erro ao deletar perfil','Erro')
      return;
    }
    await this.deleteProfile();
    this.dialog.closeAll();
    //this.userService
  }
  refreshPage():void{
    window.location.reload();
  }
}