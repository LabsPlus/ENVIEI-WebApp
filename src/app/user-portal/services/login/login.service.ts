import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { IToken } from '../../../shared/interfaces/Token/token.interfaces';
import { ILoginData } from '../../../shared/interfaces/login-data/login-data.interfaces';
import { environment } from '../../../../environments/environment';
import { StayConnectedService } from '../stay-connected/stay-connected.service';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  
  private apiUrl = environment.apiUrl;
  private stayConnectedService: StayConnectedService;

  constructor(private http: HttpClient) {
    this.stayConnectedService = new StayConnectedService();
  }
  
  login({ email, password }: ILoginData, stayConnected?: boolean) {
    return this.http
      .post<IToken>(`${this.apiUrl}user/login`, { email, password })
      .pipe(
        tap((value) => {
          sessionStorage.setItem('accessToken', JSON.stringify(value.token));
          
          if (stayConnected) {
            this.stayConnectedService.saveToken(value.token);
          }

        })
      );
  }


  getToken(): string | null {
    return sessionStorage.getItem('accessToken');
  }


  logout(): void {
    sessionStorage.removeItem('accessToken');
  }
}
