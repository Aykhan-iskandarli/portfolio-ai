export type ILevelTheme = 'day' | 'night' | 'cave';

export interface IBox {
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface IBlock extends IBox {
    skillKey: string;
    used: boolean;
    bump: number;
}

export interface ILevel {
    groupKey: string;
    theme: ILevelTheme;
    color: string;
    width: number;
    ground: IBox;
    pipes: IBox[];
    blocks: IBlock[];
    flagX: number;
}

export interface IPlayer extends IBox {
    vx: number;
    vy: number;
    onGround: boolean;
    facing: 1 | -1;
    runTime: number;
    jumpBuffer: number;
    coyote: number;
}

export interface IPopup {
    x: number;
    y: number;
    life: number;
}

export interface IGameState {
    level: ILevel;
    player: IPlayer;
    popups: IPopup[];
    cameraX: number;
    viewWidth: number;
    time: number;
    cleared: boolean;
}

export interface IGameInput {
    left: boolean;
    right: boolean;
    jump: boolean;
    jumpPressed: boolean;
}

export type IGameEvent =
    | {type: 'jump'}
    | {type: 'block'; skillKey: string}
    | {type: 'flag'};
