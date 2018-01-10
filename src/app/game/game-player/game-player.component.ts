import { Component, OnInit } from '@angular/core';
import { Action } from '../meta/action.enum';
import { Character } from '../meta/character.class';

@Component({
  selector: 'af-game-player',
  templateUrl: './game-player.component.html',
  styleUrls: ['./game-player.component.scss']
})
export class GamePlayerComponent implements OnInit {

  public characters: Array<Character> = [];

  constructor() { }

  onAction(action: Action, character: Character) {
    switch (action) {
      case Action.WALK_UP:
        character.x++;
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
    });

    this.characters.push(char1);
  }

}
