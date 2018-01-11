import { Character } from './../meta/character.class';
import { Character } from './../../../../../typescript-starter/src/socket.component';
import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import * as io from 'socket.io-client';
import { Subject, Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Character } from '../meta/character.class';
import { get, keys, clone, values } from 'lodash';

export interface GameState {
  characters: any;
}
export interface PlayerMove {
  id: string;
  x: number;
  y: number;
}

@Injectable()
export class SocketService {

  private gameState: GameState = {
    characters: {},
  };

  public gameSubject: Subject<GameState> = new Subject<GameState>();
  public game$: Observable<GameState>;
  
  public playersSubject: Subject<Array<Character>> = new Subject<Array<Character>>();
  public players$: Observable<Array<Character>>;
  public players: Array<Character> = [];

  public playersMoveSubject: Subject<PlayerMove> = new Subject<PlayerMove>();
  public playersMove$: Observable<PlayerMove>;
  public myId: string;

  constructor(private socket: Socket) {

    console.log('[INIT Socket]', this.socket);
    this.players$ = this.playersSubject.asObservable();
    this.playersMove$ = this.playersMoveSubject.asObservable();    
    this.game$ = this.gameSubject.asObservable();
    

    this.socket.on('newPlayer', (newCharacter) => {
      console.log('[SOCKET] New player', newCharacter);
      this.players.push(newCharacter);
      this.playersSubject.next(this.players);
    });

    this.socket.on('state', (gameState) => {
      gameState.characters[this.socket.ioSocket.id].isMe = true;
      const players: Array<Character> = values(gameState.characters);
      console.log('[SOCKET] Getting state', gameState, players, this.socket.ioSocket.id);
      this.players = players;
      this.playersSubject.next(players);
    });

    this.socket.on('move', (character: Character) => {
      const pI = this.players.findIndex((p: Character) => p.id === character.id);
      this.players[pI] = character;
      this.playersMoveSubject.next(character);
    });
  }

  move(character: Character) {
    if (character.isMe) {
      this.socket.emit('move', character);
    }
  }



}
