import { 
  Component, 
  OnInit, 
  Input, 
  ViewChild, 
  ElementRef, 
  EventEmitter, 
  Output
} from '@angular/core';
import { Direction } from '../meta/direction.enum';
import { Action } from '../meta/action.enum';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { Character } from '../meta/character.class';

@Component({
  selector: 'af-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  private _spriteUrl: string;

  private _canvasContext: CanvasRenderingContext2D;
  private _sprite;
  
  private _spriteWidth = 832;
  private _spriteHeight = 1344;
  
  private _rows = 21;
  private _cols = 13;

  private _width = this._spriteWidth / this._cols;
  private _height = this._spriteHeight / this._rows;

  private _currentFrame = 0;
  private _frameCount = 8;

  private _framePerRow = [
    7, 7, 7, 7,
    8, 8, 8, 8,
    9, 9, 9, 9,
    6, 6, 6, 6,
    13, 13, 13, 13,
    6
  ]

  private _x = 0;
  private _y = 0;

  private _srcX = 0;
  private _srcY = 0;

  private _character: Character;

  @Output() action = new EventEmitter<Action>();

  @ViewChild('canvas') canvas: ElementRef;

  @Input() set character(value: Character) {
    this._spriteUrl = `/assets/sprites/characters/${value.spriteName}.png`;
    this._sprite = new Image();
    this._sprite.src = this._spriteUrl;

    this._character = value;
  }

  @Input() direction: Direction = Direction.Right;
  
  constructor(private _hotkeysService: HotkeysService) {

  }

  ngOnInit() {
    this.canvas.nativeElement.width = this._width;
    this.canvas.nativeElement.height = this._height;
    this._canvasContext = this.canvas.nativeElement.getContext('2d');

    this._hotkeysService.add(new Hotkey('z', (event: KeyboardEvent): boolean => {
      this.action.emit(Action.WALK_UP);
      this.draw(Action.WALK_UP);
      return true;
    }));

    this._hotkeysService.add(new Hotkey('s', (event: KeyboardEvent): boolean => {
      this.action.emit(Action.WALK_DOWN);
      this.draw(Action.WALK_DOWN);
      return true;
    }));

    this._hotkeysService.add(new Hotkey('q', (event: KeyboardEvent): boolean => {
      this.action.emit(Action.WALK_LEFT);
      this.draw(Action.WALK_LEFT);
      return true;
    }));

    this._hotkeysService.add(new Hotkey('d', (event: KeyboardEvent): boolean => {
      this.action.emit(Action.WALK_RIGHT);
      this.draw(Action.WALK_RIGHT);
      return true;
    }));

    this.draw(Action.WALK_RIGHT);
  }

  updateFrame(action: Action) {
    this._currentFrame = ++this._currentFrame % this._frameCount;
    this._srcX = this._currentFrame * this._width;
    this._srcY = action * this._height;
  }

  draw(action: Action): void {
    this.updateFrame(action);
    this._canvasContext.clearRect(this._x, this._y, this._width, this._height);
    this._canvasContext.drawImage(this._sprite, this._srcX, this._srcY, this._width, this._height, this._x, this._y, this._width, this._height);
  }

}
