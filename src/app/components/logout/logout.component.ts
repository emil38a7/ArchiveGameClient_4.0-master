import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  message: string;
  constructor(public authService: AuthService, private router:Router) {
    this.message = '';

  }

  ngOnInit(){
    var r = confirm("Do you want to log out?");
    if (r == true) {
        this.logout();
        this.router.navigate(['/']);
    } else {
      this.router.navigate(['/']);
    }
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
