import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CurrentGameComponent } from "./current-game/current-game.component";
import { CreateGameComponent } from "./create-game/create-game.component";
import { AuthActivate } from "../core/auth.activate";
import { EditGameComponent } from "./edit-game/edit-game.component";
import { ShopComponent } from "./shop/shop.component";

const routes: Routes = [
    {
        path: 'create',
        component: CreateGameComponent,
    },
    {
        path: 'shop',
        component: ShopComponent
    },
    {
        path: ':gameId',
        component: CurrentGameComponent
    },
    {
        path: 'edit/:gameId',
        component: EditGameComponent
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class GameRoutingModule {}