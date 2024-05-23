import { CommonModule, Location } from '@angular/common';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HomeService } from '../../services/home/home.service';
import { ToastrNotificationService } from '../../services/toastr/toastr.service';
import IUser from '../../interfaces/IUser';
import { SidebarService } from '../../services/sidebar/sidebar.service';

@Component({
  selector: 'app-header-home',
  standalone: true,
  imports: [CommonModule],
  providers: [HomeService, ToastrNotificationService],
  templateUrl: './header-home.component.html',
  styleUrl: './header-home.component.css',
})
export class HeaderHomeComponent implements OnDestroy, OnInit {
  user: IUser = {};
  defaultProfilePhoto: string =
    '../../../../../assets/images/shared/not-registred-user-photo.png';
  menuOpen: boolean = false;
  acessToken: string;
  isNavOpen = false;
  sidebarOpenSubscription: Subscription;
  isVisible: boolean = true;
  hiddenRoutes = ['/login', '/register', '/forgot-password', '/new-password', ''];


  constructor(
    private sidebarService: SidebarService,
    private homeService: HomeService,
    private router: Router,
    private toastr: ToastrNotificationService,
    private location: Location,
  ) {
    this.isVisible = false;
    this.sidebarOpenSubscription = this.sidebarService.sidebarOpen$.subscribe(
      (isOpen) => {
        this.isNavOpen = isOpen;
      }
    );

    if (typeof localStorage !== 'undefined') {
      this.acessToken = sessionStorage.getItem('accessToken') as string;
    } else {
      this.acessToken = '';
    }

    this.getUserData();
    this.getUserData();
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentPath = this.location.path();
        this.isVisible = !this.hiddenRoutes.includes(currentPath);
      }
    });
  } 
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  getUserData(): void {
    this.homeService
      .getUserData(this.acessToken)
      .toPromise()
      .then((response: HttpResponse<IUser> | any) => {
        if (response?.status == 200 || response?.status == 201) {
          this.user.name = response.body.name;
          this.user.email = response.body.email;
          this.user.profile_photo = response.body.profile_photo;

          if (
            response.body.profile_photo == null ||
            response.body.profile_photo == ''
          ) {
            this.user.profile_photo = this.defaultProfilePhoto;
          }

          this.user.phone_number = response.body.phone_number;
        }
      })
      .catch((error: HttpErrorResponse) => {
        if (error.status >= 400 && error.status < 500) {
          console.error(error.error.error);
        }

        if (error.status >= 500) {
          console.error('Erro interno no servidor.');
        }

        this.user.name = 'Default';
        this.user.email = '';
        this.user.profile_photo = this.defaultProfilePhoto;
        this.user.phone_number = '';
      });
  }

  goToProfile(): void {
    console.log('Navigating to profile...');
  }

  logout(): void {
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem('stayConnectedToken');
    this.homeService
      .logout(this.acessToken)
      .toPromise()
      .then((response: HttpResponse<Object | any> | undefined) => {
        if (response?.status == 200 || response?.status == 201) {
          this.toastr.showSuccess('Usuário deslogado com sucesso', 'success');
          this.router.navigate(['/login']);
        }
      })
      .catch((error: HttpErrorResponse) => {
        if (error.status >= 400 && error.status < 500) {
          console.error(error.error.error);
        }

        if (error.status >= 500) {
          console.error('Internal server error.');
        }

        this.toastr.showError('Erro ao deslogar usuário', 'error');
      });
  }
  ngOnDestroy() {
    this.sidebarOpenSubscription.unsubscribe();
  }
}
