import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {routing, appRoutingProviders} from './app.routing';
import {FormsModule } from '@angular/forms'
import {HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { VideoAddComponent } from './components/video-add/video-add.component';
import { VideoEditComponent } from './components/video-edit/video-edit.component';
import { VideoDetailComponent } from './components/video-detail/video-detail.component';

import {IdentityGuard} from './services/identity.guard';
import {UserService} from './services/user.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ErrorComponent,
    LoginComponent,
    RegisterComponent,
    UserEditComponent,
    VideoAddComponent,
    VideoEditComponent,
    VideoDetailComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule 
  ],
  providers: [
    appRoutingProviders,
    IdentityGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
