import { CommonModule, Location } from '@angular/common';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HomeService } from '../../services/home/home.service';
import { ToastrNotificationService } from '../../services/toastr/toastr.service';
import IUser from '../../interfaces/IUser';
import { SidebarService } from '../../services/sidebar/sidebar.service';
import { SessionStorageService } from '../../../shared/services/session-storage/session-storage.service';
import { RouterModule } from '@angular/router';
import { AuthenticatorService } from '../../../shared/services/auth/authenticator.service';
@Component({
  selector: 'app-header-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [HomeService, ToastrNotificationService, SessionStorageService, AuthenticatorService],
  templateUrl: './header-home.component.html',
  styleUrl: './header-home.component.css',
})
export class HeaderHomeComponent implements OnDestroy, OnInit {
  user: IUser = {};
  defaultProfilePhoto: string =
    '../../../../../assets/images/shared/not-registred-user-photo.png';
  menuOpen: boolean = false;
  accessToken: string;
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
    private sessionStorageService: SessionStorageService,
    private authenticatorService: AuthenticatorService,
  ) {
    this.isVisible = false;
    this.sidebarOpenSubscription = this.sidebarService.sidebarOpen$.subscribe(
      (isOpen) => {
        this.isNavOpen = isOpen;
      }
    );

    this.accessToken = this.sessionStorageService.getSessionToken() as string;



  }

  async ngOnInit() {
    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {

        let currentUrl = this.location.path() as string;

        if (!currentUrl) {
          return;
        }

        let route = this.splitUrlToGetRoute(currentUrl);

        if (!this.hiddenRoutes.includes(route)) {
          this.isVisible = true;
          return;
        }

        this.isVisible = false;
      }

    });

    await this.getUserData();
  }

  splitUrlToGetRoute(url: string): string {
    let currentUrl = url;

    if (!currentUrl) {
      return '';
    }

    
    let hasQueryParams = currentUrl.includes('?');
    let hasChildRoute = currentUrl.includes('/', 2);


    if (!hasQueryParams && !hasChildRoute) {
      return currentUrl;
    }

    if (hasQueryParams) {
      let splitUrl = currentUrl.split('?');
      currentUrl = splitUrl[0];
    }

    if (hasChildRoute) {
      let splitUrl = currentUrl.split('/');
      currentUrl = splitUrl[1];
    }

    return currentUrl;

  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  async getUserData(): Promise<void> {

    if (!this.sessionStorageService.getSessionToken()) {
      return;
    }

    if (!this.authenticatorService.isAuthenticated(this.accessToken)) {
      return;
    }

    await this.homeService
      .getUserData(this.accessToken)
      .toPromise()
      .then(async (response: HttpResponse<IUser> | any) => {
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


    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  goToProfile(): void {
    this.router.navigate(['/home/profile']);
  }

  logout(): void {

    this.homeService
      .logout(this.accessToken)
      .toPromise()
      .then((response: HttpResponse<Object | any> | undefined) => {
        if (response?.status == 200 || response?.status == 201) {
          this.toastr.showSuccess('Usuário deslogado com sucesso', 'success');
          this.router.navigate(['/login']);
        }
      }).then(() => {
        this.sessionStorageService.removeSession();
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
