import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[UserService]
})
export class RegisterComponent implements OnInit {

  public page_title:string;
  public user:User;
  public status:string;
  constructor(
    private _userService:UserService
  ) {
    this.page_title = 'Registro';
    this.user = new User (1,'','','','','Role_User', '');
   }

  ngOnInit(): void {
  }

  registrar(form){

    this._userService.register(this.user).subscribe(
      response=>{
        if(response.status == 'success'){
          this.status = 'success';
          console.log(response.user);
          form.reset();

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
