import { Character } from './../../../../../typescript-starter/src/character.class';
import { PlayerMove } from './../services/socket.service';
import { Component, OnInit } from '@angular/core';
import { Action } from '../meta/action.enum';
import { Character } from '../meta/character.class';
import { CharacterComponent } from '../character/character.component';
import { ActionData, SPRITE, Actions } from '../meta/actions.data';
import { Direction } from '../meta/direction.enum';
import { SocketService } from '../services/socket.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'af-game-player',
  templateUrl: './game-player.component.html',
  styleUrls: ['./game-player.component.scss']
})
export class GamePlayerComponent implements OnInit {

  public characters: Array<Character> = [];

  constructor(public socket: SocketService) {}

  ngOnInit() {
    this.socket.players$.subscribe((characters: Array<Character>) => {
      console.log('New state', characters);
      this.characters = characters;
    });

    this.socket.playersMove$.subscribe((character: Character) => {
      let playerIndex = this.characters.findIndex(c => c.id === character.id);
      this.characters[playerIndex] = character;
    });
  }

  trackByFn(index, item) {
    return item.id;
  }

  onAction(data, character: Character, component: CharacterComponent) {
    const action: ActionData = data.action;
    const direction: Direction = data.direction;

    switch (action.key) {
      case 'walk':
        this.playerWalk(action, direction, character, component);
        this.socket.move(character);
        break;
      // case Action.WALK_DOWN:
      //   character.y++;
      //   break;
      // case Action.WALK_RIGHT:
      //   character.x++;
      //   break;
      // case Action.WALK_LEFT:
      //   character.x--;
      //   break;
      default:
        break;
    }
  }

  playerWalk(action: ActionData, direction: Direction, character: Character, component: CharacterComponent) {
    switch (direction) {
      case 'up':
        if (character.y - character.velocity >= 0) {
          character.lastDirection = Direction.UP;
          character.lastAction = Actions.WALK;
          character.y -= character.velocity;
        }
        break;
      case 'down':
        if (character.y + character.velocity <= 600) {
          character.y += character.velocity;
        }
        break;
      case 'left':
        if (character.x - character.velocity >= 0) {
          character.x -= character.velocity;
        }
        break;
      case 'right':
        if (character.x - character.velocity <= 600) {
          character.x += character.velocity;
        }
        break;
    }
  }

}
