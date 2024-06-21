import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormaterService {

  constructor() { }

  formatApiKey(apiKey: string) : string{
    const totalChars = apiKey.length;

    if (totalChars < 20) {
      let result = '*'.repeat(totalChars);
      return result;
    }

    const visibleChars = apiKey.slice(16, 19);

    const hiddenChars = '*'.repeat(16) + visibleChars + '*'.repeat(totalChars - 19);

    return hiddenChars;
  }
}
