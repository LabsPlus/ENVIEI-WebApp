import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  forgotPassword(email: string) {
    return this.http.post(`${this.apiUrl}/api/user/forgot-password`, { email });
  }
}
