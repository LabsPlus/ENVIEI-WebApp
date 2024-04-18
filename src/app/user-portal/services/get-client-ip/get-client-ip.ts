import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root',
  })
  
export default class GetClientIp {


    constructor(private http: HttpClient) {}

    verifyIp(): string {
        let ip = '';
        
        this.http.get('https://api.ipify.org?format=json').subscribe((response: any) => {
            ip = response.ip;
        });
        
        return ip;
    }
}