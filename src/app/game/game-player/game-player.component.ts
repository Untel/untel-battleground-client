import { Component, OnInit } from '@angular/core';
import { Action } from '../meta/action.enum';
import { Character } from '../meta/character.class';
import { CharacterComponent } from '../character/character.component';

@Component({
  selector: 'af-game-player',
  templateUrl: './game-player.component.html',
  styleUrls: ['./game-player.component.scss']
})
export class GamePlayerComponent implements OnInit {

  public characters: Array<Character> = [];

  constructor() { }


  onAction(action: Action, character: Character, component: CharacterComponent) {
    console.log('Action: ', action, 'Character: ', character, ' Component: ', component);
    switch (action) {
      case Action.WALK_UP:
        character.y--;
        break;
      case Action.WALK_DOWN:
        character.y++;
        break;
      case Action.WALK_RIGHT:
        character.x++;
        break;
      case Action.WALK_LEFT:
        character.x--;
        break;
      default:
        break;
    }
  }

  ngOnInit() {

    const char1 = new Character({
      id: 'jon',
      spriteName: 'jon',
      name: 'jon',
      x: 0,
      y: 0,
      hp: 100,
      hpMax: 100
    });

    const char2 = new Character({
      id: 'adrien',
      spriteName: 'naked',
      name: 'Adrien',
      x: 50,
      y: 50,
      hp: 50,
      hpMax: 100
    });

    this.characters.push(char1);
    this.characters.push(char2);    
  }

}
