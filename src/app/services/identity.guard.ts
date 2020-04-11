import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from '../services/user.service';

@Injectable()
export class IdentityGuard implements CanActivate{
    constructor(
        private _router:Router,
        private _userservice:UserService
    ){

    }
    
    canActivate() {
        let identity = this._userservice.getidentity();

        if(identity){
            return true;
        }else{
            this._router.navigate(['/login']);
            return false;
        }        
    }


}