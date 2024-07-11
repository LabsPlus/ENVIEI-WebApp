import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  createSessionWithNoStayConnectedMode(token: string) {

    if (!token) {
      return;
    }

    const formattedToken: string = this.formatToken(token) as string;

    if (typeof window.localStorage !== 'undefined') {
      window.localStorage.setItem('accessToken', formattedToken);
    }
  }

  createSessionWithStayConnectedMode(token: string) {

    if (!token) {
      return;
    }

    const formattedToken: string = this.formatToken(token) as string;

    if (typeof window.localStorage !== 'undefined') {
      window.localStorage.setItem('accessToken', formattedToken);
    }
  }

  updateSessionWithRefreshedToken(token: string) {
      
      if (!token) {
        return;
      }
  
      const formattedToken: string = this.formatToken(token) as string;
      
      this.removeSession();
      
      if (typeof window.localStorage !== 'undefined') {
        window.localStorage.setItem('accessToken', formattedToken);
      }
  }

  getSessionToken() {

    if (typeof window === 'undefined') {
      return null;
    }

    let token = window.localStorage.getItem('accessToken');

    if (!token) {
      token = window.sessionStorage.getItem('accessToken');
    }

    return token;
  }

  removeSession() {

    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.removeItem('accessToken');
    window.sessionStorage.removeItem('accessToken');
  }

  formatToken(token: string) {

    if (!token) {
      return;
    }

    let trimmedToken = token.trim().replace(/^"|"$/g, '');

    return `"${trimmedToken}"`;
  }
}
