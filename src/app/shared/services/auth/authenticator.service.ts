import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import { IToken } from '../../interfaces/Token/token.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {

  private registerUrl = environment.apiUrl;
  private stayConnected: boolean = false;

  constructor(private httpClient: HttpClient) { }

  async isAuthenticated(accessToken: string): Promise<boolean> {
    
    try {
      const response = axios.get(this.registerUrl + 'user/isLoggedIn', { headers: { 'Authorization': 'Bearer ' + accessToken } });
      return (await response).data.isLoggedIn;
      
    } catch (error) {

      console.error(error);
      return false;
    }

    
  }

  async login(email: string, password: string, stayConnected?: boolean): Promise<HttpResponse<IToken>> {
    
    let accessToken = '';
    this.stayConnected = stayConnected || false;

    const response = this.httpClient.post<any>(this.registerUrl + 'user/login', { email, password }, { observe: 'response' });

    const httpResponse: HttpResponse<IToken> | any = await response.toPromise();

    return httpResponse;
  }

  async logout(accessToken: string): Promise<boolean> {
    
    let isLoggedOut = false;

    const response = this.httpClient.get(this.registerUrl + 'user/logout', { observe: 'response', headers: { 'Authorization': 'Bearer ' + accessToken } });

    try {
      const httpResponse: HttpResponse<Object> | any = await response.toPromise();
      if (httpResponse.data.isLoggedIn) {
        isLoggedOut = true;
      }
    } catch (error) {
      isLoggedOut = false;
    }

    return isLoggedOut;

  }

  async refreshToken(accessToken: string): Promise<string> {
    
    let newAccessToken = '';

    const response = this.httpClient.get(this.registerUrl + 'user/refreshToken', { observe: 'response', headers: { 'Authorization': 'Bearer ' + accessToken } });

    try {
      const httpResponse: HttpResponse<Object> | any = await response.toPromise();
      newAccessToken = httpResponse.body.refreshToken;
    } catch (error) {
      newAccessToken = '';
    }

    return newAccessToken;
  }

  getStayConnected(): boolean {
    return this.stayConnected;
  }
}
