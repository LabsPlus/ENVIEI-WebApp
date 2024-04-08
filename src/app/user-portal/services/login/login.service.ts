import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { IToken } from '../../../shared/interfaces/Token/token.interfaces';
import { ILoginData } from '../../../shared/interfaces/login-data/login-data.interfaces';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:3003';

  constructor(private http: HttpClient) {}

  login({ email, password }: ILoginData) {
    console.log('login service');

    return this.http
      .post<IToken>(`${this.apiUrl}/api/auth/login`, { email, password })
      .pipe(
        tap((value) => {
          console.log('token', value.token);
          sessionStorage.setItem('token', JSON.stringify(value.token));
        })
      );
  }

  // Método para obtener el token almacenado
  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  // Método para limpiar el token almacenado
  logout(): void {
    sessionStorage.removeItem('token');
  }
}
