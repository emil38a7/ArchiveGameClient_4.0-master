
export class Answer {
  answerID : string;
  answerText : string;
  questionID: string;
  correctAnswer: string;
  constructor(answerID : string, answerText : string,  questionID:string, correctAnswer:string){
      this.answerID = answerID;
      this.answerText = answerText
      this.questionID = questionID;
      this.correctAnswer = correctAnswer;
  }
  
}
