
export class Answer {
  _id : string;
  answerID : string;
  answerText : string;
  questionID: string;
  correctAnswer: string;
  constructor(_id : string, answerID : string, answerText : string,  questionID:string, correctAnswer:string){
      this._id = _id;
      this.answerID = answerID;
      this.answerText = answerText
      this.questionID = questionID;
      this.correctAnswer = correctAnswer;
  }
  
}
