import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CpfValidatorService {

  constructor() { }

  validateCpfOrCnpj(identificationNumber: string): boolean {

    identificationNumber = identificationNumber.replace(/[^\d]+/g, '');

    if (identificationNumber.length === 11) {
      return this.validateCpf(identificationNumber);
    } else if (identificationNumber.length === 14) {
      return this.validateCnpj(identificationNumber);
    } else {
      return false;
    }
  }

  validateCpf(cpf: string): boolean {

    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf === '') {
      return false;
    }

    if (cpf.length !== 11) {
      return false;
    }

    if (cpf === '00000000000' ||
      cpf === '11111111111' ||
      cpf === '22222222222' ||
      cpf === '33333333333' ||
      cpf === '44444444444' ||
      cpf === '55555555555' ||
      cpf === '66666666666' ||
      cpf === '77777777777' ||
      cpf === '88888888888' ||
      cpf === '99999999999') {
      return false;
    }

    let add = 0;
    let rev = 0;

    for (let i = 1; i <= 9; i++) {
      add = add + parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
    }

    rev = (add * 10) % 11;

    if ((rev === 10) || (rev === 11)) {
      rev = 0;
    }

    if (rev !== parseInt(cpf.substring(9, 10), 10)) {
      return false;
    }

    add = 0;

    for (let i = 1; i <= 10; i++) {
      add = add + parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
    }

    rev = (add * 10) % 11;

    if ((rev === 10) || (rev === 11)) {
      rev = 0;
    }

    if (rev !== parseInt(cpf.substring(10, 11), 10)) {
      return false;
    }

    return true;

  }

  validateCnpj(cnpj: string): boolean {

    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj === '') {
      return false;
    }

    if (cnpj.length !== 14) {
      return false;
    }

    if (cnpj === '00000000000000' ||
      cnpj === '11111111111111' ||
      cnpj === '22222222222222' ||
      cnpj === '33333333333333' ||
      cnpj === '44444444444444' ||
      cnpj === '55555555555555' ||
      cnpj === '66666666666666' ||
      cnpj === '77777777777777' ||
      cnpj === '88888888888888' ||
      cnpj === '99999999999999') {
      return false;
    }

    let size = cnpj.length - 2;
    let numbers = cnpj.substring(0, size);
    const digits = cnpj.substring(size);
    let sum = 0;
    let pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i), 10) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    let result = sum % 11 < 2 ? 0 : 11 - sum % 11;

    if (result !== parseInt(digits.charAt(0), 10)) {
      return false;
    }

    size = size + 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i), 10) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    result = sum % 11 < 2 ? 0 : 11 - sum % 11;

    if (result !== parseInt(digits.charAt(1), 10)) {
      return false;
    }

    return true;

  }

}
