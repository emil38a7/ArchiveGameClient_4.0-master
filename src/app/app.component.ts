import { Component, OnInit, Injectable} from '@angular/core';
import { AuthService} from '../app/services/auth-service.service';
import { Observable } from 'rxjs/Observable';
import { HttpServiceService } from '../app/services/hhtp-service/http-service.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent implements OnInit{
  hService: HttpServiceService;
  authService: AuthService;

  constructor(hService:HttpServiceService, authService:AuthService) {
    this.hService = hService;
    this.authService = authService;
   }
  
ngOnInit():void{
  this.hService.cleanGame();
  //this.authService.logout();
}

title = 'app';
}
