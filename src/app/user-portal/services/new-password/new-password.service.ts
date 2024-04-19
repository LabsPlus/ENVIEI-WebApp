import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewPasswordService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  newPassword(password: string, token: string) {
    return this.http.post(`${this.apiUrl}user/new-password`, { password, token });
  }
}
