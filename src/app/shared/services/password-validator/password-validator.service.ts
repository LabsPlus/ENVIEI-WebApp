import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordValidatorService {

  constructor() { }

  async isPasswordFormatValid(password: string): Promise<boolean> {

    const passwordRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}$'
    );

    return passwordRegex.test(password);
  }
}
