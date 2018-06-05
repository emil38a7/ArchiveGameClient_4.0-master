export class Player {
    _id:String;
    playerID : string;
    playerNickName: string;
    playerScore: string
    constructor(_id:String, playerID : string, playerNickName:string, playerScore:string){
        this._id = _id;
        this.playerID = playerID;
        this.playerNickName = playerNickName;
        this.playerScore = playerScore;

    }
}
