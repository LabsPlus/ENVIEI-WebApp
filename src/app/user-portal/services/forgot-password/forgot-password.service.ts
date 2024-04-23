import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import GetClientIp from '../get-client-ip/get-client-ip';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  private apiUrl = environment.apiUrl;
  private getClientIp: any;

  constructor(private http: HttpClient) {
    this.getClientIp = new GetClientIp(http);
  }

  forgotPassword(email_recovery: string) {
    this.setIpOnLocalStorage();
    const ip = localStorage.getItem('ip');
    return this.http.post(
      `${this.apiUrl}user/forgot-password`,
      {
        ip,
        email_recovery,
      },
      { observe: 'response' }
    );
  }

  setIpOnLocalStorage() {
    this.getClientIp.verifyIp();
  }
}
