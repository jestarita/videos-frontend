import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {environment} from '../../environments/environment';


@Injectable()
export class UserService{
    public url:string;
    public identity;
    public token;

    constructor(
        public _http:HttpClient
    ){
        this.url = environment.url;
    }

    register(user):Observable<any>{
        let json = JSON.stringify(user);
        
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url+'usuario/registrar', params, {headers:headers});
    }

    signup(user, gettoken= null):Observable<any>{

        if(gettoken != null){
            user.gettoken = 'true';
        }
        let json = JSON.stringify(user);        
        let params = "json="+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url+'usuario/loguearse', params, {headers:headers});
    }

    getidentity():Observable<any>{
        let identity = JSON.parse(localStorage.getItem('identity'));
        return (identity && identity != 'undefined')? this.identity= identity:null;
    }

    gettoken(){
        let token = localStorage.getItem('token');
        return (token && token != 'undefined')? this.token = token:null;
    }

    update_user(user, token):Observable<any>{
        let json = JSON.stringify(user);        
        let params = "json="+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token) ;

        return this._http.put(this.url+'usuario/edit', params, {headers:headers});
    }

}
