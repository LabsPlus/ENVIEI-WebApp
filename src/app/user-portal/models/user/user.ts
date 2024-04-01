export class User {
    
    id: number;
    name: string;
    company_name: string;
    login_id: number;
    created_at?: Date;
    updated_at?: Date;

    constructor(){
        this.id = -1;
        this.name = "";
        this.company_name = "";
        this.login_id = -1;
    }
}