import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StayConnectedService {

  constructor() { }

  saveToken(token: string) {
    localStorage.setItem('stayConnectedToken', token);
  }

  getToken() {
    return localStorage.getItem('stayConnectedToken');
  }

  removeToken() {
    localStorage.removeItem('stayConnectedToken');
  }

  hasAlreadyConnected() {
    
    const token = this.getToken();

    if (!token) {
      return false;
    }

    const tokenDecoded = JSON.parse(atob(token.split('.')[1]));
    const tokenExpiration = tokenDecoded.exp * 1000;
    const now = new Date().getTime();


    if (now > tokenExpiration) {
      this.removeToken();
      return false;
    }

    if (sessionStorage.getItem('accessToken') == null) {
      sessionStorage.setItem('accessToken', token);
    }

    return true;
  }

}
