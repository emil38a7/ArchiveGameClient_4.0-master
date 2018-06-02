import{ Answer } from '../models/answer.model';
export class Question {
    questionID : string;
    questionText: string;
    questionDifficulty: string;
    questionAnswers: Array<Answer>;
    
    constructor(questionID : string, questionText:string, questionDifficulty:string, questionAnswers: Array<Answer>){
        this.questionID = questionID;
        this.questionText = questionText;
        this.questionDifficulty = questionDifficulty;
        this.questionAnswers = questionAnswers;

    }
}
