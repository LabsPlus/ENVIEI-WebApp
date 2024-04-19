import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root',
  })
  
export default class GetClientIp {


    constructor(private http: HttpClient) {}

    verifyIp(): Promise<string>{
        let ip : any = null;
        
        this.http.get('https://api.ipify.org?format=json').subscribe((response: any) => {
            localStorage.setItem('ip', response.ip);
        });
        
        return ip;
    }
}