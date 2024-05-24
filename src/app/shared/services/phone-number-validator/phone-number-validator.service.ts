import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhoneNumberValidatorService {

  constructor() { }

  isPhoneNumberValid(phoneNumber: string): boolean {
    const phoneNumberRegex = new RegExp(
      '^(\\+\\d{1,3}[- ]?)?\\d{10}$'
    );

    return phoneNumberRegex.test(phoneNumber);
  }
}
