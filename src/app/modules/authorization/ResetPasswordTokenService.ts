import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class ResetPasswordTokenService {
    constructor() { }

    setToken(token: string) {
        localStorage.setItem("ResetPasswordToken", token);
    }

    getToken() {
        return localStorage.getItem('ResetPasswordToken');
    }

    removeToken() {
        localStorage.removeItem('ResetPasswordToken');
    }

    hasToken() {
        return !!localStorage.getItem('ResetPasswordToken');
    }
}