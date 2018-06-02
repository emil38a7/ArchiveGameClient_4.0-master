import { Component, OnInit } from '@angular/core';
import { NavMenuServiceService } from '../../services/nav-menu-service.service';


@Component({
  selector: 'app-running-app',
  templateUrl: './running-app.component.html',
  styleUrls: ['./running-app.component.css']
})
export class RunningAppComponent implements OnInit {

  //httpService:HttpServiceService;
 // myInterval;


  constructor(public nav :NavMenuServiceService) {

   // this.httpService = hService;
   }
   
  ngOnInit() {
    this.nav.hide();
  }
  //timer(){
   // this.myInterval = setInterval(function(){document.getElementById("seconds")})
  }

