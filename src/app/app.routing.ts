import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//componentes
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { VideoAddComponent } from './components/video-add/video-add.component';
import { VideoEditComponent } from './components/video-edit/video-edit.component';
import { VideoDetailComponent } from './components/video-detail/video-detail.component';

import {IdentityGuard} from './services/identity.guard';

const appRoutes:Routes =[
    {path: '', component: HomeComponent},
    {path: 'inicio', component: HomeComponent},
    {path: 'inicio/:page', component: HomeComponent},
    {path: 'registro', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'logout/:sure', component: LoginComponent},
    {path: 'ajustes', component: UserEditComponent, canActivate: [IdentityGuard] },
    {path: 'agregar-video', component: VideoAddComponent , canActivate: [IdentityGuard]},
    {path: 'editar-video/:id', component: VideoEditComponent , canActivate: [IdentityGuard]},
    {path: 'ver-video/:id', component: VideoDetailComponent , canActivate: [IdentityGuard]},
    {path: 'error', component:ErrorComponent},
    {path: '**', component:ErrorComponent}
];

export const appRoutingProviders:any[] = [];
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);