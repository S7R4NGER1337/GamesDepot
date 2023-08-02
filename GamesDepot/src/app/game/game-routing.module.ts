import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CurrentGameComponent } from "./current-game/current-game.component";
import { CreateGameComponent } from "./create-game/create-game.component";

const routes: Routes = [
    {
        path: 'create',
        component: CreateGameComponent
    },
    {
        path: ':gameId',
        component: CurrentGameComponent
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class GameRoutingModule {}