import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';

const routes: Routes = [
  { 
    path: 'home',
    loadChildren: ()=> import('./home/home.module').then((m) => m.HomeModule) 
  },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user/:userId', component: UserProfileComponent},
  
  { 
    path: 'game',
    loadChildren: ()=> import('./game/game.module').then((m) => m.GameModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
