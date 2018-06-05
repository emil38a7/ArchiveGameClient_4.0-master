import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../services/hhtp-service/http-service.service'
import { Question } from '../../models/question.model'
import { QuestionRelation } from '../../models/question-relation.model'
import { Game } from '../../models/game.model'
import { Player } from '../../models/players.model'
import { PlayerRelation } from '../../models/player-relation.model';
import { Answer } from '../../models/answer.model';
import { timeout } from 'q';
import { Router } from '@angular/router'
import { AnswersRelation } from '../../models/answers-relation.model';
import { error } from 'protractor';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  htttpService:HttpServiceService
  gameDifficulty = ['very easy','easy', 'normal','hard', 'very hard'];
  gameLenght = ['2', '5', '10','15', '20'];
  gameModel = new Game('', '', '');
  questionRelationModel = new QuestionRelation('', '');
  difficultyModel = 'hard';
  lenghtModel = '2';

  filteredQuestions: Question[];
  gameQuestions: Question[] = [];
  randomIndexes = [];
  players:Player[];
  answerRelationsList:AnswersRelation[];
  answers: Answer[];
  myPlayers =[new Player("5b1598d47cfa8f3ddc84fd48", "1", "Ala", "5"), new Player("", "2", "Bob", "10"),new Player("", "3", "Fred", "0"),]

  myInterval;
  currentQuestion:Question = new Question('0', '',[new Answer('','', '', '', ''), new Answer('','', '', '', ''),new Answer('','', '', '', ''), new Answer('','', '', '', '')],'', '');
  endGameQuestion:Question = new Question('-1', '',[new Answer('','', '', '', ''), new Answer('','', '', '', ''),new Answer('','', '', '', ''), new Answer('','', '', '', '')],'', '');

  constructor(hService:HttpServiceService, private router:Router) {
    this.htttpService = hService;
   }
    submitted = false;

    ngOnInit() {
    }
    onSubmit() { this.submitted = true; }

    displayArray(array){
      var test='';
      array.forEach(element => {
        test+=element + " ";
      });
      alert(test);
    }

    displayPlayers(){
      this.htttpService.displayPlayersList().subscribe(data => {
      this.players=data as Player[];
      console.log("Players running");
      }, error=> console.error(error));
    }
  
    createUniqeRandom(max, randomArray) {
        var randomIndex = Math.floor(Math.random() * Math.floor(max));
        if(!this.randomIndexes.includes(randomIndex)){
          randomArray.push(randomIndex)
        }else this.createUniqeRandom(max, randomArray)
    }

    fillArrayWithUniqeRandoms(gameLenght, max, randomArray){
      var i;
      for (i = 0; i < gameLenght; i++){
        this.createUniqeRandom(max, randomArray)
      }
    }

    SetGameQuestions(randomArray, filteredQuestions){
      var i;
      var j;
      var k = 1;
      for (i = 0; i< randomArray.length; i++){
        for(j = 0; j < filteredQuestions.length;j++){
          if(j == randomArray[i]){
            this.filteredQuestions[j].questionIndex = k.toString();
            this.gameQuestions.push(filteredQuestions[j]);
            k++;
          }
        }
      }
      this.endGameQuestion.questionIndex = (k).toString();
      this.gameQuestions.push(this.endGameQuestion);
    }

    myTimer(){
      
      this.myInterval =  setInterval(() => { 
        //if game not finished
        this.displayPlayers() }, 1000);
    }

    finishGame(){
      clearInterval(this.myInterval);
    }

    findGameWinner(){
      this.finishGame();
      console.log("1");

      this.htttpService.displayAnswerRelationList().subscribe(data => {
        this.answerRelationsList=data as AnswersRelation[]; 
        var playerScore = 0;
        //this.myPlayers = 
        this.players.forEach(player => {
          console.log(player.playerNickName)
          this.answerRelationsList.forEach(answerRelation => {
            console.log(answerRelation.playerID)
              if (player._id == answerRelation.playerID){
                this.gameQuestions.forEach(gameQuestion => {
                  gameQuestion.questionAnswers.forEach(answer => {
                    console.log(answer.answerID)
                    if(answerRelation.answerID == answer._id){
                      if(answer.correctAnswer == "true"){
                        playerScore++;
                        player.playerScore = playerScore.toString();
                      }
                    }
                  });
                });
              }
            });
            alert("Score is:  "+ player.playerNickName + ", " + player.playerScore)
            playerScore = 0;
          });
          this.players.forEach(player => {
            this.htttpService.updatePlayer(player);
          });
        }, error=> console.error(error));    
    }

    startTheGame(){
      //clearInterval(this.myInterval);
      this.players.forEach(element => {
        this.htttpService.postPlayerRelation(new PlayerRelation(element.playerID, this.gameModel.gameID));
      });
    
      window.open("http://localhost/DisplayQuestionMarty.html", "_blank");


      for(let j = 0; j < this.gameQuestions.length; j++){
        setTimeout(() => {
          this.updateQuestion(this.gameQuestions[j], this.currentQuestion)}, 10000 * j);
          if(this.currentQuestion.questionIndex == this.gameLenght.toString()){ //chenge code
            this.findGameWinner();
          }
        }
      }

    createGame(gameDifficulty){
      var gameLenghtInt = parseInt(this.lenghtModel);

      this.htttpService.sortByDifficulty(gameDifficulty).subscribe(data => {
        this.filteredQuestions = data as Question[];
        this.fillArrayWithUniqeRandoms(gameLenghtInt, this.filteredQuestions.length, this.randomIndexes);
        this.SetGameQuestions(this.randomIndexes, this.filteredQuestions);
        this.myTimer();
        //update game model
        this.gameModel.gameID = "5";
        this.gameModel.gameStatus = "open";
        this.gameModel.gameLength = this.gameQuestions.length.toString();

        this.htttpService.postGame(this.gameModel);
        this.gameQuestions.forEach(element => {
          this.htttpService.postQuestionRelation(new QuestionRelation(element.questionID, this.gameModel.gameID));
        });
       this.htttpService.postCurrentQuestion(this.currentQuestion);
        //open display question site
      }, error=> console.error(error));    
    }

    updateQuestion(newQuestion, currentQuestion){
      //console.log("timeout"); 
      //console.log("new question is :" + newQuestion.questionID + " currentQuestion is: " + currentQuestion.questionID)   
      this.htttpService.updateCurrenQuestion(newQuestion, currentQuestion);
      this.currentQuestion = newQuestion;
    }

    createUniqueQuestionID(){
      //not implemented
    }
}
//git push -u origin master

