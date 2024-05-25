import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserService } from '../../services/user-service/user.service';
import { MatButtonModule } from '@angular/material/button';
import IUser from '../../interfaces/IUser';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-email-recuperacao-modal',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  providers: [UserService],
  templateUrl: './change-email-recuperacao-modal.component.html',
  styleUrl: './change-email-recuperacao-modal.component.css'
})
export class ChangeEmailRecuperacaoModalComponent {
  constructor(public dialog: MatDialog, private userService: UserService) { }

  openDialog() {
    const dialogRef = this.dialog.open(ChangeEmailRecuperacaoModalComponent);

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  userProfile : IUser = {};
  acessToken : string = '';
  updateProfileData(): void {
    this.userService
      .updateUser( this.userProfile, this.acessToken,)
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
}
