export class UserDto {
    readonly id: any;
    readonly username: string;
    readonly email: string;
    readonly role: string;
    readonly isActivated: boolean;
    constructor(model: { email: string, username: string, id: any, role: string, isActivated: boolean }){
        this.id = model.id;
        this.username = model.username;
        this.email = model.email;
        this.role = model.role;
        this.isActivated = model.isActivated;
    }
}