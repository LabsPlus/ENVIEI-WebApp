import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user-service/user.service';
import  IUser from '../../interfaces/IUser';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-email-modal',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, CommonModule, ReactiveFormsModule],
  providers: [UserService],
  templateUrl: './change-email-modal.component.html',
  styleUrl: './change-email-modal.component.css'
})
export class ChangeEmailModalComponent {

  userForm! : FormGroup
  userProfile: IUser = {};
  acessToken: string = '';

  constructor(
    public dialog: MatDialog,
    private userService: UserService
  ) {

    this.getToken();

    this.userForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  public openDialog() {
    const dialogRef = this.dialog.open(ChangeEmailModalComponent,{
        panelClass: 'mat-typography-container'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  public getFormValue() : void{
    this.userProfile.email = this.userForm.get('email')?.value;
    this.userProfile.password = this.userForm.get('password')?.value;
  }

   public getToken(): void {
    this.acessToken = localStorage.getItem('accessToken') || '';
  }

  public submit(){

  }

}
