import { FormControl } from '@angular/forms';

export interface IRegisterData {
    name: FormControl;
    cpf_cnpj: FormControl;
    phone_number: FormControl;
    company_name?: FormControl;
    email: FormControl;
    password: FormControl;
    confirmPassword: FormControl;
    email_recovery: FormControl;
}