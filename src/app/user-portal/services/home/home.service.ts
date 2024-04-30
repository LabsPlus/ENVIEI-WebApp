import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import IUser from '../../interfaces/IUser';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private registerUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getUserData(access_token: string) {
    return this.httpClient.get(this.registerUrl+'user/get', { observe: 'response', headers: { 'Authorization': 'Bearer ' + access_token }}, );

  }

  updateUser(user: IUser, access_token: string) {
    return this.httpClient.put(this.registerUrl+'user/update', user, { observe: 'response', headers: { 'Authorization': 'Bearer ' + access_token } });
  }

  updateProfilePhoto(photo: any, access_token: string) {
    return this.httpClient.put(this.registerUrl+'user/update-photo', photo, { observe: 'response', headers: { 'Authorization': 'Bearer ' + access_token } });
  }

  updatePassword(password: string, access_token: string) {
    return this.httpClient.put(this.registerUrl+'user/update-password', { password }, { observe: 'response', headers: { 'Authorization': 'Bearer ' + access_token } });
  }

  deleteUser(access_token: string) {
    return this.httpClient.delete(this.registerUrl+'user/delete', { observe: 'response', headers: { 'Authorization': 'Bearer ' + access_token } });
  }


}
