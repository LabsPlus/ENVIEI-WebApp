import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import IUser from '../../interfaces/IUser';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class RegisterService {

  private registerUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  registerUser(user: IUser) {

    return this.httpClient.post(this.registerUrl+'user/create', user, { observe: 'response' });
    
  }

}
