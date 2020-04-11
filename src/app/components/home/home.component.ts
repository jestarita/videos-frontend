import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import {VideoService} from '../../services/video.service';
import {Video} from '../../models/video';
import { from } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers : [UserService, VideoService]
})
export class HomeComponent implements OnInit {

  public page_title:string;
  public token;
  public identity;
  public status:string;
  public videos;
  public page;
  public nextpage;
  public previouspage;
  public numberpages;
  constructor(
    private _userService:UserService,
    private _videoServie:VideoService,
    private _route:Router,
    private _router:ActivatedRoute
  ) {
    this.page_title = 'inicio';
   }

  ngOnInit(): void {  
   
    this.getuser();
    this.update_list();
    
    
  }

  update_list(){
    this._router.params.subscribe(params =>{
      var page = +params['page'];

      if(!page){
        page = 1;
        this.previouspage = 1;
        this.nextpage = 2;
      }
      this.getvideos(page);
    });
  }

  getuser(){
    this.token = this._userService.gettoken();
    this.identity = this._userService.getidentity();
    
  }

  getvideos(page){
    this._videoServie.list_videos(this.token, page).subscribe(      
      response =>{
        if(response.status == 'success' && response.videos){
          this.status = 'success';
          this.videos = response.videos;
          var numberpages = [];
          for (let index = 1; index <= response.total_pages; index++) {
            numberpages.push(index);
          }
          this.numberpages = numberpages;

          if(page >= 2){
            this.previouspage = page-1;
          }else{
            this.previouspage = 1;
          }
          if (page< response.total_pages){
            this.nextpage = page+1;
          }
          else{
            this.nextpage = response.total_pages;
          }
          
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

  getThumb(url, size = null) {
    var video, results, thumburl;
    
     if (url === null) {
         return '';
     }
     
     results = url.match('[\\?&]v=([^&#]*)');
     video   = (results === null) ? url : results[1];
    
     if(size != null) {
         thumburl = 'http://img.youtube.com/vi/' + video + '/'+ size +'.jpg';
     }else{
         thumburl = 'http://img.youtube.com/vi/' + video + '/mqdefault.jpg';
     }
    
      return thumburl;
        
    }

    delete_video(id){
      this._videoServie.delete_video(id,this.token).subscribe(
        response =>{
          if(response.status == 'success' && response.video){
            this.update_list();
          }
        },
        error =>{
          console.log(<any>error);
        }
      )
    } 
   

}
