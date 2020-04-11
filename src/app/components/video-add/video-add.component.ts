import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import {Video} from '../../models/video';
import {VideoService} from '../../services/video.service';
@Component({
  selector: 'app-video-add',
  templateUrl: './video-add.component.html',
  styleUrls: ['./video-add.component.css'],
  providers: [UserService, VideoService]
})
export class VideoAddComponent implements OnInit {

  public page_title:string;
  public identity;
  public token;
  public video:Video;
  public status:string;
  constructor(
    private _userservice:UserService,
    private _route:Router,
    private _router:ActivatedRoute,
    private _videoService:VideoService
  ) { 
    this.page_title = 'Agregar video';
    this.token = this._userservice.gettoken();
    this.identity = this._userservice.getidentity();
  }

  ngOnInit(): void {
    this.video = new Video(1, this.identity.sub,'','','','',null, null);
  }
  agregar(form){
 
    this._videoService.add_video(this.video, this.token).subscribe(
      response =>{
        if(response.video && response.status == 'success'){
          this.status = 'success';
          this._route.navigate(['/inicio']);
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
