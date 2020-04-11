import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public page_title:string;
  public user:User;
  public status:string;
  public token;
  public identity;
  constructor(
    private _userService:UserService,
    private _route:Router,
    private _router:ActivatedRoute
  ) {
    this.page_title = 'Inicio sesión';
    this.user = new User (1,'','','','','Role_User', '');
   }
 
  ngOnInit(): void {
      this.logout();
  }

  getuser(){
    this.token = this._userService.gettoken();
    this.identity = this._userService.getidentity();
  }

  iniciar_sesion(form){
  this._userService.signup(this.user).subscribe(
      response =>{
        if(!response.status || response.status != 'error'){
          this.status = 'success';
          this.identity = response;
            this._userService.signup(this.user, true).subscribe(
              response =>{               
                if(!response.status || response.status != 'error'){
                  this.token = response;

                  localStorage.setItem('token', this.token);
                  localStorage.setItem('identity', JSON.stringify(this.identity));
                  this._route.navigate(['/inicio']);
                }
                else{
                  this.status = 'error';
                }
                
              }, error =>{
                this.status = 'error';
                console.log(<any>error);
              }
            )          
        }
        else{
          this.status = 'error';
        }
        
      }, error =>{
        this.status = 'error';
        console.log(<any>error);
      }
    )
  }

  logout(){
    this._router.params.subscribe(params =>{
      let sure = +params['sure'];

      if(sure == 1){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        this._route.navigate(['/inicio']);
      }
    })
  }

}
