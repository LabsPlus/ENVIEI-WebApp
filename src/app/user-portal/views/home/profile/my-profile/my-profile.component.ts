import { Component } from '@angular/core';
import { MatSlideToggleModule, _MatSlideToggleRequiredValidatorModule, } from '@angular/material/slide-toggle';
import { ThemePalette } from '@angular/material/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../services/user-service/user.service';
import IUser from '../../../../interfaces/IUser';
import { ChangePersonalInformationModalComponent } from '../../../../components/change-personal-information-modal/change-personal-information-modal.component';
import { ChangeEmailModalComponent } from '../../../../components/change-email-modal/change-email-modal.component';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [MatSlideToggleModule, CommonModule],
  templateUrl: './my-profile.component.html',
  providers: [UserService, ChangePersonalInformationModalComponent, ChangeEmailModalComponent],
  styleUrl: './my-profile.component.css',
})
export class MyProfileComponent {
  color: ThemePalette = 'primary';

  defaultProfilePhoto: string = '../../../../../../../src/assets/images/shared/profile-photo.svg';
  userProfile: IUser = {}
  acessToken: string;

  constructor(
    private userService: UserService, 
    private changePersonalInformationModalComponent: ChangePersonalInformationModalComponent,
    private changeEmailModalComponent: ChangeEmailModalComponent
  ) {

    if (typeof localStorage !== 'undefined') {
      this.acessToken = sessionStorage.getItem('accessToken') as string;
    } else {
      this.acessToken = '';
    }


    this.getProfileData();

    console.log(this.userProfile);

  }

  openChangePersonalInformationModal() {
    this.changePersonalInformationModalComponent.openDialog();
  }

  openChangeEmailModal() {
    this.changeEmailModalComponent.openDialog();
  }
  
  getProfileData(): void {
    this.userService
      .getUserData(this.acessToken)
      .toPromise()
      .then((response: HttpResponse<IUser> | any) => {
        if (response?.status == 200 || response?.status == 201) {

          this.userProfile.name = response.body.name;
          this.userProfile.email = response.body.email;
          this.userProfile.profile_photo = response.body.profile_photo;
          this.userProfile.email_recovery = response.body.email_recovery;
          this.userProfile.cpf_cnpj = response.body.cpf_cnpj;
          this.userProfile.phone_number = response.body.phone_number;

          if (
            response.body.profile_photo == null ||
            response.body.profile_photo == ''   ||
            response.body.profile_photo == undefined
          ) {
            this.userProfile.profile_photo = this.defaultProfilePhoto;
          }

          this.userProfile.phone_number = response.body.phone_number;
        }
      })
      .catch((error: HttpErrorResponse) => {
        if (error.status >= 400 && error.status < 500) {
          console.error(error.error.error);
        }

        if (error.status >= 500) {
          console.error('Erro interno no servidor.');
        }

        this.userProfile.name = 'Default';
        this.userProfile.email = '';
        this.userProfile.profile_photo = this.defaultProfilePhoto;
        this.userProfile.phone_number = '';
      });
  }
}
