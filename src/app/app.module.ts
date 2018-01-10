import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { SocketService } from './socket.service';
import { LobbyModule } from './lobby/lobby.module';
import { GameModule } from './game/game.module';

const config: SocketIoConfig = { url: 'http://localhost:81', options: {} };

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    LobbyModule,
    GameModule,
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
