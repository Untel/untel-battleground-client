import { NgModule } from '@angular/core';
import { GamePlayerComponent } from '../game/game-player/game-player.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'game',
    component: GamePlayerComponent,
  },
  {
    path: '',
    redirectTo: '/game',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
