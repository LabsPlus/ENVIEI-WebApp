import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { IKey } from '../../interfaces/IKey';

@Injectable({
  providedIn: 'root'
})
export class ApiKeysService {

  private apiKeysUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getApiKeys(accessToken: string) {
    return this.httpClient.get<IKey[]>(this.apiKeysUrl+'user/getAllKeysFromUser', { observe: 'response', headers: { 'Authorization': 'Bearer ' + accessToken } });
  }
}
