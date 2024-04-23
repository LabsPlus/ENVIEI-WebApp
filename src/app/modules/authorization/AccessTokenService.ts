import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class TokenService {
    constructor() { }

    setToken(token: string) {
        localStorage.setItem("token", token);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    removeToken() {
        localStorage.removeItem('token');
    }

    hasToken() {
        return !!localStorage.getItem('token');
    }
}