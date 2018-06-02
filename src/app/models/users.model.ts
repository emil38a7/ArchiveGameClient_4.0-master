export class Users {
    userID : string;
    userName: string;
    userEmail: string;
    userPassword: string;
    roleID: string;
    constructor(userID : string, userName:string, userEmail:string, userPassword:string, roleID:string){
        this.userID = userID;
        this.userName = userName;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.roleID = roleID;

    }
}
