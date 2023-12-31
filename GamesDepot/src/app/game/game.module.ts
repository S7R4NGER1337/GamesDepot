import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGameComponent } from './create-game/create-game.component';
import { CurrentGameComponent } from './current-game/current-game.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameRoutingModule } from './game-routing.module';
import { EditGameComponent } from './edit-game/edit-game.component';
import { ShopComponent } from './shop/shop.component';



@NgModule({
  declarations: [
    CreateGameComponent,
    CurrentGameComponent,
    EditGameComponent,
    ShopComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    GameRoutingModule,
  ],
  exports: [
    CreateGameComponent,
    CurrentGameComponent,
    ShopComponent
  ]
})
export class GameModule { }
