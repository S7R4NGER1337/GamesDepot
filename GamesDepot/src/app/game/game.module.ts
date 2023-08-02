import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGameComponent } from './create-game/create-game.component';
import { CurrentGameComponent } from './current-game/current-game.component';



@NgModule({
  declarations: [
    CreateGameComponent,
    CurrentGameComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GameModule { }
