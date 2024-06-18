import { Injectable } from '@angular/core';
import { ToastrNotificationService } from '../toastr/toastr.service';
import { UserService } from '../user-service/user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StayConnectedService {

  constructor(private router: Router, private userService: UserService, private toastrNotificationService: ToastrNotificationService) { }

  //this function checks if the window object is defined
  private isWindowDefined(): boolean {
    return typeof window !== 'undefined';
  }

  //this function removes quotes from the token
  verifyAndFormatQuotesOnToken(token: string): string {
    let formattedToken = token.replace(/^['"]+|['"]+$/g, '');
    formattedToken = `"${formattedToken}"`;
  
    return formattedToken;
  }
  

  saveTokenOnLocalStorage(token: string) {
    if (!this.isWindowDefined()) return;
    
    const tokenFormatted = this.verifyAndFormatQuotesOnToken(token);
    window.localStorage.setItem('stayConnectedToken', tokenFormatted);
  }


  saveTokenSesionStorage(token: string) {
    if (!this.isWindowDefined()) return;
    
    const tokenFormatted = this.verifyAndFormatQuotesOnToken(token);
    window.sessionStorage.setItem('accessToken', tokenFormatted);
  }

  //this function gets the token from the local storage or session storage
  getAccessToken(): string | null {
    if (!this.isWindowDefined()) {
      return null;
    }
  
    const sessionToken = window.sessionStorage.getItem('accessToken');
    const localToken = window.localStorage.getItem('stayConnectedToken');
    
    return sessionToken || localToken;
  }


  removeToken() {
    if (!this.isWindowDefined()) return;
    
    window.localStorage.removeItem('stayConnectedToken');
    window.sessionStorage.removeItem('accessToken');
  }

  //this function handles errors and redirects the user to the login page
  private handleErrorAndRedirect() {
    this.toastrNotificationService.showError('Faça login novamente.', 'Error');
    this.removeToken();
    this.router.navigate(['/login']);
  }
  

  //this function checks if the user is already connected
  async hasAlreadyConnected(token:string): Promise<boolean | null> {

    try {
      const response: any = await this.userService.isLoggedIn(token).toPromise();
      if(response?.status === 200) {
        return true;
      }
    } catch (error: any) {
      if (error.status === 400) {
        this.handleErrorAndRedirect();
      }
      return false;
    }
    return null;
}

}

  