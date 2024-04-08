import IUser from '../../interfaces/IUser';

export class User implements IUser{
    
    id: number;
    name: string;
    company_name: string;
    login_id: number;
    created_at?: Date;
    updated_at?: Date;
    cpf_cnpj: string;
    phone_number: string;
    password: string;

    constructor(){
        this.id = -1;
        this.name = "";
        this.company_name = "";
        this.login_id = -1;
        this.cpf_cnpj = "";
        this.phone_number = "";
        this.password = "";
    }
    
}