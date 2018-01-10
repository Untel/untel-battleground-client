import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GamePlayerComponent } from '../game/game-player/game-player.component';
import { CharacterComponent } from '../game/character/character.component';
import { CharacterService } from './services/character.service';
import { HotkeyModule } from 'angular2-hotkeys';

const components = [
  GamePlayerComponent,
  CharacterComponent
]

@NgModule({
  imports: [
    CommonModule,
    GameRoutingModule,
    HotkeyModule.forRoot(),
  ],
  declarations: [...components],
  exports: [...components],

  providers: [
    CharacterService,
  ],
})
export class GameModule { }
