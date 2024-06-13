import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService {

    constructor() { }

    public isValidateEmail(email: string) : boolean {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    }
}
