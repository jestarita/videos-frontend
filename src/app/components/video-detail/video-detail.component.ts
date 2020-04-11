import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {UserService} from '../../services/user.service';
import {Video} from '../../models/video';
import {VideoService} from '../../services/video.service';
@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
  providers: [VideoService]
})
export class VideoDetailComponent implements OnInit {
 
  public identity;
  public token;
  public video;
  public status:string;
  constructor(
    private _userservice:UserService,
    private _route:Router,
    private _router:ActivatedRoute,
    private _videoService:VideoService,
    private _sanitizer: DomSanitizer

  ) { 
    this.token = this._userservice.gettoken();
    this.identity = this._userservice.getidentity();
  }

  ngOnInit(): void {
    this.getvideo();
  }

  getvideo(){
    this._router.params.subscribe(params =>{
      let id = +params['id'];
      this._videoService.detail_video(id,this.token).subscribe(
        response =>{
          if( response.status == 'success'){           
            this.video = response.video;
          }else{
            this._route.navigate(['/inicio']);
          }
        },
        error =>{
          
          console.log(<any>error);
        }
      )
    });
  }

  getVideoIframe(url) {
    var video, results;
 
    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];
 
    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);   
}


}
