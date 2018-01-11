import { get } from 'lodash';
import { ActionData, SPRITE, Actions } from './actions.data';
import { Direction } from './direction.enum';

export class Character {

    public id: string;
    public name: string;
    public spriteName: string;
    public hp: number;
    public hpMax: number;
    public x: number;
    public y: number;
    public velocity: number;
    public isMe: boolean;
    public lastAction: Actions;
    public lastDirection: Direction;

    constructor(parameters: CharacterCtor) {
        this.id = get(parameters, 'id');
        this.name = get(parameters, 'name') || this.id;
        this.spriteName = get(parameters, 'spriteName') || 'naked';
        this.hp = get(parameters, 'hp') || 100;
        this.hpMax = get(parameters, 'hpMax') || 100;
        this.x = get(parameters, 'x') || 0;
        this.y = get(parameters, 'y') || 0;
        this.velocity = get(parameters, 'velocity') || 1;
        this.isMe = get(parameters, 'isMe') || false;
        this.lastAction = get(parameters, 'lastAction') || Actions.WALK;
        this.lastDirection = get(parameters, 'lastDirection') || Direction.RIGHT;
    }
}

export interface CharacterCtor {
    id: string;
    name?: string;
    spriteName?: string;
    hp?: number;
    hpMax?: number;
    x?: number;
    y?: number;
    velocity?: number;
    isMe?: boolean;
    lastAction?: Actions;
    lastDirection?: Direction;
};