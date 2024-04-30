import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from '../../../services/home/home.service';
import IUser from '../../../interfaces/IUser';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-header-home',
  standalone: true,
  imports: [CommonModule],
  providers: [HomeService],
  templateUrl: './header-home.component.html',
  styleUrl: './header-home.component.css'
})
export class HeaderHomeComponent {

  user: IUser = {};
  menuOpen: boolean = false; // Estado do menu
  acessToken: string ;
  constructor(private homeService: HomeService) { 
    
    if (typeof localStorage !== 'undefined') {
      this.acessToken = localStorage.getItem('access_token') as string;
    } else {
      this.acessToken = '';
    }
  
    this.getUserData();
  }
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    
  }

  getUserData(): void {
    
    this.homeService.getUserData(this.acessToken).
    toPromise().
    then((response: HttpResponse<IUser> | any) => {
      
      if (response?.status == 200 || response?.status == 201) {
        
        this.user.name = response.body.name;
        this.user.email = response.body.email;
        this.user.profile_photo = response.body.profile_photo;
        this.user.phone_number = response.body.phone_number;
        
      }

    }).catch((error: HttpErrorResponse) => {
      if (error.status >= 400 && error.status < 500) {
        console.error(error.error.error);
      }

      if (error.status >= 500) {
        console.error('Erro interno no servidor.');
      }

      this.user.name = 'Default';
      this.user.email = '';
      this.user.profile_photo = '../../../../../assets/images/shared/not-registred-user-photo.png';
      this.user.phone_number = '';

    });
  }


  goToProfile(): void {
    console.log('Navigating to profile...');
  }

  logout(): void {
    localStorage.removeItem('access_token');  
  }

  
}
