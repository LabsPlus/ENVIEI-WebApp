import { Injectable } from '@angular/core';
import { ToastrNotificationService } from '../toastr/toastr.service';
import { UserService } from '../user-service/user.service';
import { of, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StayConnectedService {

  constructor(private userService: UserService, private toastrNotificationService: ToastrNotificationService) { }

  saveTokenOnLocalStorage(token: string) {
    localStorage.setItem('stayConnectedToken', '"' + token + '"');
  }
  saveTokenSesionStorage(token: string) {
    sessionStorage.setItem('accessToken', '"' + token + '"');
  }

  getAccessToken() {
    
    if (typeof window == 'undefined') {
      return null;
    }
  
    let sessionToken = sessionStorage.getItem('accessToken') ?  sessionStorage.getItem('accessToken') : null;
    let localToken = localStorage.getItem('stayConnectedToken') ? localStorage.getItem('stayConnectedToken') : null ;
    
    if (sessionToken !== null)
      return sessionToken;
  
    if (localToken !== null)
      return localToken;
  
    return null;
  }

  removeToken() {
    localStorage.removeItem('stayConnectedToken');
    sessionStorage.removeItem('accessToken');
  }
    
  async hasAlreadyConnected(): Promise<boolean> {
    const token = this.getAccessToken() as string;
  
    if (!token) {
      return false;
    }
  
    const tokenDecoded = JSON.parse(atob(token.split('.')[1]));
    const tokenExpiration = tokenDecoded.exp * 1000;
    const now = new Date().getTime();
  
    if (now > tokenExpiration) {
      this.removeToken();
      return false;
    }
  
    try {
      const response: any = await this.userService.isLoggedIn(token).toPromise();
      return response?.status === 200;
    } catch (error: any) {
      if (error.status === 400) {
        this.toastrNotificationService.showError('Faça login novamente.', 'Error');
        this.removeToken();
      }
      return false;
    }
  }
  // hasAlreadyConnected(): Observable<boolean> {
  //   const token = this.getAccessToken() as string;
  
  //   if (!token) {
  //     return of(false);
  //   }
  
  //   const tokenDecoded = JSON.parse(atob(token.split('.')[1]));
  //   const tokenExpiration = tokenDecoded.exp * 1000;
  //   const now = new Date().getTime();
  
  //   if (now > tokenExpiration) {
  //     this.removeToken();
  //     return of(false);
  //   }
  
  //   return this.userService.isLoggedIn(token).pipe(
  //     map((response: any) => response?.status === 200),
  //     catchError((error: any) => {
  //       if (error.status === 400) {
  //         this.toastrNotificationService.showError('Faça login novamente.', 'Error');
  //         this.removeToken();
  //       }
  //       return of(false);
  //     })
  //   );
  // }
}

  