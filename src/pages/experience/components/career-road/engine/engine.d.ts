export interface IPoint {
    world: {x: number; y: number; z: number};
    camera: {x: number; y: number; z: number};
    screen: {x: number; y: number; w: number; scale: number};
}

export type IRoadSpriteKind = 'tree' | 'billboard' | 'arch' | 'finish' | 'cta';

export interface IRoadSprite {
    kind: IRoadSpriteKind;
    imageKey: string;
    // Yolun mərkəzindən məsafə, yol eni vahidi ilə (±1 = yolun kənarı)
    offset: number;
    // Dünya vahidində en (hündürlük şəklin nisbətindən gəlir)
    width: number;
}

export interface ISegment {
    index: number;
    p1: IPoint;
    p2: IPoint;
    curve: number;
    sprites: IRoadSprite[];
    dark: boolean;
    clip: number;
}

export interface ICheckpoint {
    z: number;
    type: 'job' | 'finish';
    jobKey: string | null;
}

export interface ITrack {
    segments: ISegment[];
    length: number;
    checkpoints: ICheckpoint[];
    skipZ: number;
}

export interface IRoadState {
    track: ITrack;
    position: number;
    speed: number;
    playerX: number;
    steer: -1 | 0 | 1;
    braking: boolean;
    skyOffset: number;
    hillOffset: number;
    time: number;
    nextCheckpoint: number;
    finished: boolean;
    stopped: boolean;
}

export interface IRoadInput {
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
}

export type IRoadEvent =
    | {type: 'job'; jobKey: string}
    | {type: 'finish'}
    | {type: 'stopped'};

export interface IRoadJob {
    key: string;
    company: string;
    start: string;
    end: string | null;
}

export interface IRoadLabels {
    now: string;
    nextStop: string;
    yourTeam: string;
}

export interface IRoadPalette {
    skyTop: string;
    skyBottom: string;
    sun: string;
    mountain: string;
    hill: string;
    grass: string;
    grassDark: string;
}
