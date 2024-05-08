import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class NameValidatorService {

  constructor() { }

  public validateName(name: string): boolean {
    
    
    if (!name) {
      return false;
    }

    if (name.length < 2) {
      return false;
    }

    if (name.length > 55) {
      return false;
    }

    if (!name.match(/^[a-zA-ZÀ-ÿ\s'-]+$/)) {
      return false;
    }

    return true;
  }


}
