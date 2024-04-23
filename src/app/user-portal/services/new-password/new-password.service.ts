import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ToastrNotificationService } from '../../services/toastr/toastr.service';

interface UpdatePasswordResponse {
  success: boolean;
  message?: string;
  status?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NewPasswordService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private toarst: ToastrNotificationService) { }

  newPassword(password: string, token: string){
    return this.http.post(`${this.apiUrl}user/update-password`, { password, token });
  }

}
