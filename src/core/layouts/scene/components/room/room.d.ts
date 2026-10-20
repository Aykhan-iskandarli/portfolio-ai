export interface IBookshelf {
    x: number;
    y: number;
    w: number;
    h: number;
    seed: number;
}

export interface IPlant {
    x: number;
    y: number;
    scale?: number;
    flip?: boolean;
}
