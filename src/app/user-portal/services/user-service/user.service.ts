import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import IUser from '../../interfaces/IUser';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private registerUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getUserData(accessToken: string) {
    return this.httpClient.get<IUser>(this.registerUrl+'user/getUserByAccessToken', { observe: 'response', headers: { 'Authorization': 'Bearer ' + accessToken } });
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
    return this.httpClient.post(this.registerUrl+'user/delete', { observe: 'response', headers: { 'Authorization': 'Bearer ' + access_token } });
  }

  scheduleUserDeletion(accessToken: string) {
    return this.httpClient.get(this.registerUrl+'user/scheduleUserDeletion', { observe: 'response', headers: { 'Authorization': 'Bearer ' + accessToken } });
  }

  validateUserPassword(password: string, accessToken: string) {
    return this.httpClient.post(this.registerUrl+'user/validateUserPassword', { password: password }, { observe: 'response', headers: { 'Authorization': 'Bearer ' + accessToken } });
  }

  logout(accessToken: string) {
    const tokenObject = { accessToken: accessToken };
    return this.httpClient.post(this.registerUrl+'user/logout',  tokenObject, { observe: 'response', headers: { 'Authorization': 'Bearer ' + accessToken } });
  }

  requestUpdateEmail(user: IUser, access_token: string) {
    return this.httpClient.post(this.registerUrl+'user/requestUpdateEmail', user, { observe: 'response', headers: { 'Authorization': 'Bearer ' + access_token } });
  }

  requestUpdateEmailRecovery(user: IUser, access_token: string) {
    return this.httpClient.post(this.registerUrl+'user/requestUpdateEmailRecovery', user, { observe: 'response', headers: { 'Authorization': 'Bearer ' + access_token } });
  }

  isLoggedIn(accessToken: string) {      
    return this.httpClient.get(this.registerUrl+'user/isLoggedIn', { observe: 'response', headers: { 'Authorization': 'Bearer ' + accessToken } });
  }
  
  setFlagValueRememberPasswordChange(accessToken: string, flagValue: boolean) {
    return this.httpClient.post(this.registerUrl+'user/setFlagValueRememberPasswordChange', { remember_password_change_is_enable: flagValue }, { observe: 'response', headers: { 'Authorization': 'Bearer ' + accessToken } });
  }

  isFlagRememberPasswordChangeEnable(accessToken: string) {
    return this.httpClient.get(this.registerUrl+'user/isFlagRememberPasswordChangeEnable', { observe: 'response', headers: { 'Authorization': 'Bearer ' + accessToken } });
  }
}
