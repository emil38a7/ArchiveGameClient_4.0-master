import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Question } from '../../models/question.model';
import{ Answer } from '../../models/answer.model';
import {HttpServiceService} from '../../services/hhtp-service/http-service.service'


@Component({
  selector: 'questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  providers: [ HttpServiceService ],

})
export class QuestionsComponent {

  private currentQuestion : Question;
  hService:HttpServiceService;
  modelAnswer;
  formDisable: boolean;


  difficulties = ['very easy', 'easy', 'normal','hard', 'very hard'];

  model = new Question('', '', '', [ new Answer('', '', '', ''), new Answer('', '', '', ''),new Answer('', '', '', ''), new Answer('', '', '', '')]);

  public questions: Question[];
  url: string = "http://localhost:3000/question"
  questionWasSelected(question: Question):void{
  }

  constructor(http:Http, hService:HttpServiceService) {
    this.hService = hService;
    this.hService.displayQuestionList().subscribe(data => {
      this.questions = data as Question[]
      }, error => console.error(error));
    }
    submitted = false;

    ngOnInit() {
    }
    onSubmit() { this.submitted = true; }
    
     newQuestion() {
      this.model = new Question('', '', '', [new Answer('', '', '', ''), new Answer('', '', '', ''),new Answer('', '', '', ''), new Answer('', '', '', '')]);
      this.formDisable = false;

    }

    postNewQuestion(){
      this.model.questionID='5';
      this.model.questionText='abc';
      this.model.questionDifficulty = "easy";
      this.model.questionAnswers = [
                                new Answer('1','ans1', '11', 'true'), 
                                new Answer('2', 'ans2', '11', 'false'),
                                new Answer('3', 'ans3', '11', 'false'),
                                new Answer('4', 'ans4', '11', 'false')
                              ];

      //alert('ID ' + model.questionID +' Text ' + model.questionText + ' Diff ' +  model.questionDifficulty + ' ans text ' +  model.questionAnswers[0].answerText+
      //      ' ans ID ' +  model.questionAnswers[0].answerID + 'ques ID ' +  model.questionAnswers[0].questionID + ' ansCorrect ' +  model.questionAnswers[0].correctAnswer)
      
      this.hService.postNewQuestion(this.model);
    }

    readQuestion(question){
      var selectedOption = document.getElementById('difficulty');
      this.model = question;
      this.formDisable = true;
    }
}
    
