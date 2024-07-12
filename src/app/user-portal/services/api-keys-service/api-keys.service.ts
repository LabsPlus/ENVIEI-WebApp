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

  updateApiKey(accessToken: string, key: IKey) {
    return this.httpClient.patch(this.apiKeysUrl+'key/updateApiKey', { key }, { observe: 'response', headers: { 'Authorization': 'Bearer ' + accessToken } });
  }

  createApiKey(accessToken: string, key: IKey) {
    return this.httpClient.post(this.apiKeysUrl+'key/generateKey', { key }, { observe: 'response', headers: { 'Authorization': 'Bearer ' + accessToken } });
  }

  deleteApiKey(accessToken: string, Key: IKey) {    
    return this.httpClient.delete(`${this.apiKeysUrl}key/${Key.id}`, { observe: 'response', headers: { 'Authorization': 'Bearer ' + accessToken } });
  }

  toggleApiKey(accessToken: string, id: number, is_active: boolean) {
    return this.httpClient.post(this.apiKeysUrl+'key/toggleKeyStatus', { id: id, is_active: is_active}, { observe: 'response', headers: { 'Authorization': 'Bearer ' + accessToken } });
  }
}
