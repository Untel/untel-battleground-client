import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotkeyModule } from 'angular2-hotkeys';
import { GameRoutingModule } from './game-routing.module';

import { GamePlayerComponent } from '../game/game-player/game-player.component';
import { CharacterComponent } from '../game/character/character.component';

import { CharacterService } from './services/character.service';
import { PixiModule } from '../pixi/pixi.module';
import { HealthBarComponent } from './health-bar/health-bar.component';
import { SocketService } from './services/socket.service';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

const components = [
  GamePlayerComponent,
  CharacterComponent
]

@NgModule({
  imports: [
    PixiModule,
    CommonModule,
    GameRoutingModule,
    SocketIoModule.forRoot(config),
    HotkeyModule.forRoot(),
  ],
  declarations: [...components, HealthBarComponent],
  exports: [...components],

  providers: [
    CharacterService,
    SocketService
  ],
})
export class GameModule { }
