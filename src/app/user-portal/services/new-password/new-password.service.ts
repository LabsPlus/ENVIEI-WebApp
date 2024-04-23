import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
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

  newPassword(password: string, token: string): Observable<UpdatePasswordResponse> {
    return this.http.post<UpdatePasswordResponse>(`${this.apiUrl}user/update-password`, { password, token })
      .pipe(
        map(response => {
          if (!('success' in response)) {
            this.toarst.showError('Invalid response format', 'Error');
            throw new Error('Invalid response format');
          }
  
          if (response.success) {
            this.toarst.showSuccess('Password updated successfully', 'Success');
            return response;
          } else {
            this.toarst.showError('Password update failed: ' + response.message, 'Error');
            throw new Error('Password update failed: ' + response.message);
          }
        })
      );
  }
  
}
