import { Socket } from 'ng-socket-io';
import { SocketService } from './../services/socket.service';
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
import { Action } from '../meta/action.enum'
import { getAction, Actions, SPRITE, ActionData } from '../meta/actions.data';
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

  private runningAnimation;

  public direction: Direction = Direction.RIGHT;

  @Output() action = new EventEmitter<{action: ActionData, direction: Direction}>();
  @ViewChild('canvas') canvas: ElementRef;

  @Input() set character(value: Character) {
    console.log('SETTING CHAR', value);
    this._spriteUrl = `/assets/sprites/characters/${value.spriteName || 'naked'}.png`;
    this._sprite = new Image();
    this._sprite.src = this._spriteUrl;
    this._character = value;

    if (this.socket.myId === value.id) {
      this.initShortkeys();
      this.drawAnimation(SPRITE.die, Direction.UP, false);
    } else {
      this.drawAnimation(SPRITE[value.lastAction], value.lastDirection, false);
    }

  }

  constructor(private _hotkeysService: HotkeysService, private socket: SocketService) {}

  ngOnInit() {
    this.canvas.nativeElement.width = this._width;
    this.canvas.nativeElement.height = this._height;
    this._canvasContext = this.canvas.nativeElement.getContext('2d');
    // setTimeout(() => {
    //   this.drawAnimation(SPRITE.die, Direction.UP, false);
    // }, 0);
  }

  updateFrame(action: Action) {
    this._currentFrame = ++this._currentFrame % this._framePerRow[action];
    this._srcX = this._currentFrame * this._width;
    this._srcY = action * this._height;
  }

  draw(action: Action): void {
    this.updateFrame(action);
    this._canvasContext.clearRect(this._x, this._y, this._width, this._height);
    this._canvasContext.drawImage(this._sprite, this._srcX, this._srcY, this._width, this._height, this._x, this._y, this._width, this._height);
  }

  drawAnimation(action: ActionData, direction: Direction, emit?: boolean) {
    let i = 0;

    this.direction = direction;

    if (!this.runningAnimation) {
      this.runningAnimation = setInterval( () => {
        this._canvasContext.clearRect(this._x, this._y, this._width, this._height);
        this._canvasContext.drawImage(this._sprite, i * this._width, action.direction[this.direction] * this._height, this._width, this._height, this._x, this._y, this._width, this._height);

        if (!!emit) this.action.emit({action, direction});

        i++
        if (i >= action.frames) {
          clearInterval(this.runningAnimation);
          this.runningAnimation = false;
        }
      }, 50);
    }
  }


  initShortkeys() {
    this._hotkeysService.add(new Hotkey('z', (event: KeyboardEvent): boolean => {
      this.drawAnimation(SPRITE.walk, Direction.UP, true);
      return true;
    }));

    this._hotkeysService.add(new Hotkey('s', (event: KeyboardEvent): boolean => {
      this.drawAnimation(SPRITE.walk, Direction.DOWN, true);
      return true;
    }));

    this._hotkeysService.add(new Hotkey('q', (event: KeyboardEvent): boolean => {
      this.drawAnimation(SPRITE.walk, Direction.LEFT, true);
      return true;
    }));

    this._hotkeysService.add(new Hotkey('d', (event: KeyboardEvent): boolean => {
      this.drawAnimation(SPRITE.walk, Direction.RIGHT, true);
      return true;
    }));

    this._hotkeysService.add(new Hotkey('space', (event: KeyboardEvent): boolean => {
      this.drawAnimation(SPRITE.bow, this.direction, true);
      return true;
    }));

    this._hotkeysService.add(new Hotkey('enter', (event: KeyboardEvent): boolean => {
      this.drawAnimation(SPRITE.cast, this.direction, true);
      return true;
    }));
  }

}
