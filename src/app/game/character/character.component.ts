import { 
  Component, 
  OnInit,
  AfterViewInit,
  AfterViewChecked,
  Input, 
  ViewChild, 
  ElementRef, 
  EventEmitter, 
  Output
} from '@angular/core';
import { Direction } from '../meta/direction.enum';
import { getAction, Action, Actions, SPRITE } from '../meta/actions.data';
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
  
  private _rows = 21;
  private _cols = 13;

  private _width = SPRITE.width / this._cols;
  private _height = SPRITE.height / this._rows;

  private _currentFrame = 0;
  private _frameCount = 8;

  private _framePerRow = [
    7, 7, 7, 7,
    8, 8, 8, 8,
    9, 9, 9, 9,
    6, 6, 6, 6,
    13, 13, 13, 13,
    6
  ];

  private _x = 0;
  private _y = 0;

  private _srcX = 0;
  private _srcY = 0;

  public _character: Character;

  private _isMe = false;
  private set isMe(value: boolean) {
    if (!!value) this.initShortkeys();
    this._isMe = value;
  };

   _direction: Direction = Direction.RIGHT;
  set direction(action: Action) {
    // switch (action) {
    //   case Action.CAST_UP:
    //   case Action.WALK_UP:
    //     this._direction = Direction.UP;
    //     break;
    //   case Action.CAST_DOWN:
    //   case Action.WALK_DOWN:
    //     this._direction = Direction.DOWN;
    //     break;
    //   case Action.CAST_RIGHT:
    //   case Action.WALK_RIGHT:
    //     this._direction = Direction.RIGHT;
    //     break;
    //   case Action.CAST_LEFT:
    //   case Action.WALK_LEFT:
    //     this._direction = Direction.LEFT;
    //     break;
    //   default:
    //     break;
    // }
  }

  @Output() action = new EventEmitter<Action>();
  @ViewChild('canvas') canvas: ElementRef;

  @Input() set character(value: Character) {
    this._spriteUrl = `/assets/sprites/characters/${value.spriteName}.png`;
    this._sprite = new Image();
    this._sprite.src = this._spriteUrl;

    this.isMe = (value.id === 'adrien');

    this._character = value;
  }

  constructor(private _hotkeysService: HotkeysService) {}

  ngOnInit() {
    this.canvas.nativeElement.width = this._width;
    this.canvas.nativeElement.height = this._height;
    this._canvasContext = this.canvas.nativeElement.getContext('2d');
    setTimeout(() => {
      this.action.emit(Action.WALK_RIGHT)
      this.draw(Action.WALK_RIGHT);
    }, 0);
  }

  updateFrame(action: string) {
    this._currentFrame = ++this._currentFrame % this._framePerRow[action];
    this._srcX = this._currentFrame * this._width;
    this._srcY = action * this._height;
  }

  draw(action: Action): void {
    this.updateFrame(action);
    this.direction = action;
    this._canvasContext.clearRect(this._x, this._y, this._width, this._height);
    this._canvasContext.drawImage(this._sprite, this._srcX, this._srcY, this._width, this._height, this._x, this._y, this._width, this._height);
  }

  initShortkeys() {
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

    this._hotkeysService.add(new Hotkey('space', (event: KeyboardEvent): boolean => {
      this.draw(Action.SLASH_RIGHT);
      return true;
    }));

    this._hotkeysService.add(new Hotkey('enter', (event: KeyboardEvent): boolean => {
      this.draw(Action.CAST_RIGHT);
      return true;
    }));
  }

}
