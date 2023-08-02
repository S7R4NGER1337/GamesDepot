import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGameComponent } from './create-game/create-game.component';
import { CurrentGameComponent } from './current-game/current-game.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GameRoutingModule } from './game-routing.module';



@NgModule({
  declarations: [
    CreateGameComponent,
    CurrentGameComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    GameRoutingModule,
  ],
  exports: [
    CreateGameComponent,
    CurrentGameComponent
  ]
})
export class GameModule { }
