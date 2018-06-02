import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { Http } from '@angular/http';
import {HttpServiceService} from '../../services/hhtp-service/http-service.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  url: string = "http://localhost:3000/user"
  hService:HttpServiceService;
  users:User[]
  submitted:boolean;
  model = new User('', '', '', '', '');
  roles = ['Admin', 'Super User','Super - Dupper User'];

  constructor(http:Http, hService:HttpServiceService) {
    this.submitted = false;


      this.hService = hService;
      this.hService.displayUserList().subscribe(data => {
        this.users = data as User[]
        }, error => console.error(error));
  }

  ngOnInit() {
  }
  onSubmit() { this.submitted = true; }

}
