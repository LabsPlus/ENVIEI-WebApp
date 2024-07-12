import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormaterService {

  constructor() { }

  formatApiKey(apiKey: string) : string{
    const totalChars = apiKey.length;

    if (totalChars < 10) {
      let result = '*'.repeat(totalChars);
      return result;
    }

    const visibleChars = apiKey.slice(9, 11);

    const hiddenChars = '*'.repeat(9) + visibleChars + '*'.repeat(totalChars - 12);

    return hiddenChars;
  }
}
