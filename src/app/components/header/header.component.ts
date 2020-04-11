import { Component, OnInit, DoCheck } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import { from } from 'rxjs';
@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [UserService]
})
export class HeaderComponent implements OnInit, DoCheck {  
  public token;
  public identity;
  constructor(
    private _userService:UserService,
    private _route:Router,
    private _router:ActivatedRoute
  ) { 
   this.getuser();    
  }
  ngOnInit(): void {
    this.getuser();
  }

  ngDoCheck(): void {
    this.getuser();
  }
  getuser(){
    this.token = this._userService.gettoken();
    this.identity = this._userService.getidentity();
  }


}
