import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import GetClientIp  from '../get-client-ip/get-client-ip';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  private apiUrl = environment.apiUrl;
  private getClientIp: GetClientIp;
  
  constructor(private http: HttpClient ) {
    this.getClientIp = new GetClientIp(this.http);
  }

  forgotPassword(email: string) {
    return this.http.post(`${this.apiUrl}/api/user/forgot-password`, { email, ip: this.getClientIp.verifyIp()});
  }
}
