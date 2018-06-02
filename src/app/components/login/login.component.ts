import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { User } from '../../models/user.model';
import {HttpServiceService} from '../../services/hhtp-service/http-service.service'
import { Server } from 'selenium-webdriver/safari';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  message: string;
  model:User;
  httpService:HttpServiceService
  submitted = false;
  serverRes:string;


  constructor(public authService: AuthService, httpService:HttpServiceService) {
    this.message = '';
    this.model = new User('', '', 'yoda@space.eu', 'sicret', '');
    this.httpService=httpService;
  }

  onSubmit() { this.submitted = true; }

  loginBeta(model){
    if(!this.authService.loginHTTPService(model)){
      this.message = 'Incorrect credentials.';
      setTimeout(function() {
        this.message = '';
      }.bind(this), 2500);
    }
    return false;
  }

  login(username: string, password: string): boolean {
    this.message = '';
    if (!this.authService.login(username, password)) {
      this.message = 'Incorrect credentials.';
      setTimeout(function() {
        this.message = '';
      }.bind(this), 2500);
    }
    return false;
  }

}
