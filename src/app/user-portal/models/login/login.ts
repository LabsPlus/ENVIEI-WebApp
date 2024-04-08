export class Login {
    
    id: number;
    email: string;
    email_recovery: string;
    password: string;
    created_at?: Date;
    updated_at?: Date;

    constructor(){
        this.id = -1;
        this.email = "";
        this.email_recovery = "";
        this.password = "";
    }

}