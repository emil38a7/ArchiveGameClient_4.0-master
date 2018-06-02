import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent{
  message: string;
  constructor(public authService: AuthService) {
    this.message = '';
  }

  logout(): boolean {
    this.message = '';
    this.authService.logout();
    if (this.authService.logout) {
      this.message = '';
      setTimeout(function() {
        this.message = '';
      }.bind(this), 2500);
    }
    return false;
  }

 

}
