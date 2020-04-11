import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers : [UserService]
})
export class UserEditComponent implements OnInit {

  public page_title:string;
  public token;
  public identity;
  public user:User;
  public status:string;
  constructor(
    private _userService:UserService
  ) {
    this.token = this._userService.gettoken();
    this.identity = this._userService.getidentity();
    this.page_title = 'Ajustes';
    this.user = new User(this.identity.id,this.identity.name,
       this.identity.surname,this.identity.email,'','Role_user','');
   }

  ngOnInit(): void { 
    
  }
  

  Actualizar(form){
   
    this._userService.update_user(this.user, this.token).subscribe(
      response =>{
        console.log(response);
        if(response.status == 'success' && response.user){
          this.status = 'success';
          this.identity = response.user;
          this.user = response.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));

        }else{
          this.status = 'error';
        }
      },
      error =>{
        this.status = 'error';
        console.log(<any>error);
      }
    )
  }

}
