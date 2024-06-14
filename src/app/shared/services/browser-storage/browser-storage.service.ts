import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserStorageService {

  constructor() { }


  setValueOnLocalStorage(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  setValueOnSessionStorage(key: string, value: any) {
    sessionStorage.setItem(key, value);
  }

  getValueOnLocalStorage(key: string) {
    return localStorage.getItem(key);
  }

  getValueOnSessionStorage(key: string) {
    return sessionStorage.getItem(key);
  }
}
