import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import IUser from '../../interfaces/IUser';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class RegisterService {

  private registerUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  registerUser(user: IUser): Observable<boolean> {

    const transaction = this.httpClient.post(this.registerUrl+'user/create', user).pipe(
      map((response: any) => {
        if (response.success) {
          return true;
        } else {
          return false;
        }
      }),
    );

    return transaction;
  }

}
