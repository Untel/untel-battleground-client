export interface Action {
    frames: number;
    size: number;
    direction: {
        up: number;
        left: number;
        down: number;
        right: number;
    }
}

export function getAction(action: Actions): Action {
    return SPRITE[action];
}

export enum Actions {
    CAST = 'cast',
    SLASH = 'slash',
    WALK = 'walk',
    SHORT_WEAPON = 'shortWeapon',
    BOW = 'bow',
    DIE = 'die',
    BIG_WEAPON = 'bigWeapon'
}

export interface Sprite {
    cast: Action;
    slash: Action;
    walk: Action;
    shortWeapon: Action;
    bow: Action;
    die: Action;
    bigWeapon: Action;

    height: number;
    width: number;
}

export const SPRITE: Sprite = {
    width: 832,
    height: 1344,

    cast: {
        frames: 7,
        size: 1,
        direction: {
            up: 0,
            left: 1,
            down: 2,
            right: 3,
        },
    },
    
    slash: {
        frames: 7,
        size: 1,
        direction: {
            up: 4,
            left: 5,
            down: 6,
            right: 7,
        },
    },
    
    walk: {
        frames: 9,
        size: 1,        
        direction: {
            up: 8,
            left: 9,
            down: 10,
            right: 11,
        },
    },

    shortWeapon: {
        frames: 6,
        size: 1,        
        direction: {
            up: 12,
            left: 13,
            down: 14,
            right: 15,
        },
    },

    bow: {
        frames: 13,
        size: 1,
        direction: {
            up: 16,
            left: 17,
            down: 18,
            right: 19,
        },
    },

    die: {
        size: 1,
        frames: 6,
        direction: {
            up: 20,
            left: 20,
            down: 20,
            right: 20,
        },
    },

    bigWeapon: {
        size: 3,
        frames: 8,
        direction: {
            up: 21,
            left: 22,
            down: 23,
            right: 24,
        },
    },
}