import { CommonModule, Location } from '@angular/common';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HomeService } from '../../services/home/home.service';
import { ToastrNotificationService } from '../../services/toastr/toastr.service';
import IUser from '../../interfaces/IUser';
import { SidebarService } from '../../services/sidebar/sidebar.service';
import { SessionStorageService } from '../../../shared/services/session-storage/session-storage.service';
import { RouterModule } from '@angular/router';
import { AuthenticatorService } from '../../../shared/services/auth/authenticator.service';
import IHeaderInformation from '../../interfaces/IHeaderInformation';
@Component({
  selector: 'app-header-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [HomeService, ToastrNotificationService, SessionStorageService, AuthenticatorService],
  templateUrl: './header-home.component.html',
  styleUrl: './header-home.component.css',
})
export class HeaderHomeComponent implements OnInit {
  user: IUser = {};
  defaultProfilePhoto: string =
    '../../../../../assets/images/shared/not-registred-user-photo.png';
  headerInformation: IHeaderInformation = {};
  menuOpen: boolean = false;
  accessToken: string = '';
  isNavOpen = true;
  isVisible: boolean = true;

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
  }

  async ngOnInit() {
    
    this.accessToken = await this.sessionStorageService.getSessionToken() as string;

    if (!this.accessToken || this.accessToken == '') {
      console.log('tentando pegar token');
      this.accessToken = await this.tryGetTokenThreTimes();
    }

    
    this.homeService.getUserData(this.accessToken).subscribe(user => this.headerInformation = {
      profileUrl: user.body?.profile_photo,
      profileNickName: user.body?.name
    });

  }

  async ngOnChanges() {

    this.accessToken = await this.sessionStorageService.getSessionToken() as string;

    if (!this.accessToken || this.accessToken == '') {
      this.accessToken = await this.tryGetTokenThreTimes();
    }

    this.homeService.getUserData(this.accessToken).subscribe(user => this.headerInformation = {
      profileUrl: user.body?.profile_photo,
      profileNickName: user.body?.name
    })
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

  async tryGetTokenThreTimes() {
    
    let token = '';
    for (let i = 0; i < 3; i++) {
      token = await this.sessionStorageService.getSessionToken();
      if (token) {
        break;
      }
    }
    return token
  }
}
