import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotkeyModule } from 'angular2-hotkeys';
import { GameRoutingModule } from './game-routing.module';

import { GamePlayerComponent } from '../game/game-player/game-player.component';
import { CharacterComponent } from '../game/character/character.component';

import { CharacterService } from './services/character.service';
import { PixiModule } from '../pixi/pixi.module';
import { HealthBarComponent } from './health-bar/health-bar.component';

const components = [
  GamePlayerComponent,
  CharacterComponent
]

@NgModule({
  imports: [
    PixiModule,
    CommonModule,
    GameRoutingModule,
    HotkeyModule.forRoot(),
  ],
  declarations: [...components, HealthBarComponent],
  exports: [...components],

  providers: [
    CharacterService,
  ],
})
export class GameModule { }
