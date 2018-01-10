import { get } from 'lodash';

export class Character {

    public id: string;
    public name: string;
    public spriteName: string;
    public x: number;
    public y: number;

    constructor(parameters: CharacterCtor) {
        this.id = get(parameters, 'id');
        this.name = get(parameters, 'name');
        this.spriteName = get(parameters, 'spriteName');
        this.x = get(parameters, 'x');
        this.y = get(parameters, 'y');        
    }
}

export type CharacterCtor = Character;