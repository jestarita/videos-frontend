import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {environment} from '../../environments/environment';

@Injectable()
export class VideoService{
    public url:string;    

    constructor(
        public _http:HttpClient
    ){
        this.url = environment.url;
    }


    add_video(video, token):Observable<any>{
        let json = JSON.stringify(video);        
        let params = "json="+json;       
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token) ;

        return this._http.post(this.url+'video/agregar', params, {headers:headers});
    }

    list_videos(token, page):Observable<any>{    
        if(!page || page == null){
            page = 1;
          }   
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token) ;
        return this._http.get(this.url+'video/list?page='+page, {headers:headers});
    }

    detail_video(video_id, token):Observable<any>{              
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token) ;

        return this._http.get(this.url+'video/detalle/'+video_id, {headers:headers});
    }

    update_video(video, video_id, token):Observable<any>{
        let json = JSON.stringify(video);        
        let params = 'json='+json;      
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token) ;

        return this._http.put(this.url+'video/edit/'+video_id, params, {headers:headers});
    }

    delete_video(video_id, token):Observable<any>{          
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token) ;

        return this._http.delete(this.url+'video/remove/'+video_id, {headers:headers});
    }

}