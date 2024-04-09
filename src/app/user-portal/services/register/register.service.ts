import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import IUser from '../../interfaces/IUser';
import { tap } from 'rxjs';
import { Request, Response } from 'express';

@Injectable({
  providedIn: 'root',
})

export class RegisterService {

  private registerUrl = 'http://localhost:3003/api/user/create';

  constructor(private httpClient: HttpClient) {  }

  registerUser(user: IUser): void {

    try {

      if (!user) {
        throw new Error("Nenhum dado passado para o registro de usuário!");
      }

      this.httpClient.post(this.registerUrl, user).subscribe((response: any) => {
        alert('Usuário cadastrado com sucesso!');
      });

    } catch (error) {
      alert('Erro ao cadastrar usuário!');
    }

  }

}
