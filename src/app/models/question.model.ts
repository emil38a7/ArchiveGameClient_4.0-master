import{ Answer } from '../models/answer.model';
export class Question {
    questionID : string;
    questionText: string;
    questionDifficulty: string;
    questionAnswers: Array<Answer>;
    questionIndex: String;
    
    constructor(questionID : string, questionText:string, questionAnswers: Array<Answer>, questionDifficulty:string,  questionIndex:string){
        this.questionID = questionID;
        this.questionText = questionText;
        this.questionAnswers = questionAnswers;
        this.questionDifficulty = questionDifficulty;
        this.questionIndex = questionIndex;
    }
}
