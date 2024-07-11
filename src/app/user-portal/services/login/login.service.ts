import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { IToken } from '../../../shared/interfaces/Token/token.interfaces';
import { ILoginData } from '../../../shared/interfaces/login-data/login-data.interfaces';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }
  
  login({ email, password }: ILoginData, stayConnected?: boolean) {
    return this.http
      .post<IToken>(`${this.apiUrl}user/login`, { email, password }, { observe: 'response' })
  }

}
