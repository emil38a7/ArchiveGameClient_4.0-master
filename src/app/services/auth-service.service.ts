import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import 'rxjs/add/operator/map';
import {HttpServiceService} from '../services/hhtp-service/http-service.service'

@Injectable()
export class AuthService {
  httpService:HttpServiceService
  serverStatus:string;

 constructor(httpService:HttpServiceService){
  this.httpService=httpService;
 }
  
  login(user: string, password: string): boolean {
    if (user === 'nikos' && password === '0234') {
      localStorage.setItem('username', user);
      return true;
    }
    return false;
  }

  loginHTTPService(model):string{
    this.httpService.loginHTTP(model).subscribe(res => {
      if(res==202){
        alert('Yes' + res);
        this.serverStatus = res;
        localStorage.setItem('username', model.userPassword);
      } else {
        alert ('No' + res);
        this.serverStatus = res;
      }
    }, error => console.error(error)); 
    alert('status is :' + this.serverStatus)
    return this.serverStatus;
  }

  logout(): any {
    localStorage.removeItem('username');
  }

  getUser(): any {
    //token
    const token = localStorage.getItem('token');
    const jwtHelper:JwtHelperService = new JwtHelperService();
    if (jwtHelper.isTokenExpired(token)){
      //token is epired
    }
    return localStorage.getItem('username');
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }
}

export const AUTH_PROVIDERS: Array<any> = [
  { provide: AuthService, useClass: AuthService }
];
