import { get } from 'lodash';

export class Character {

    public id: string;
    public name: string;
    public spriteName: string;
    public hp: number;
    public hpMax: number;
    public x: number;
    public y: number;

    constructor(parameters: CharacterCtor) {
        this.id = get(parameters, 'id');
        this.name = get(parameters, 'name');
        this.spriteName = get(parameters, 'spriteName');
        this.hp = get(parameters, 'hp');        
        this.hpMax = get(parameters, 'hpMax');
        this.x = get(parameters, 'x');
        this.y = get(parameters, 'y');        
    }
}

export type CharacterCtor = Character;