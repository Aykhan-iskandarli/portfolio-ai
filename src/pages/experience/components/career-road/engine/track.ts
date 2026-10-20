import {ICheckpoint, IPoint, IRoadJob, IRoadSprite, IRoadState, ISegment, ITrack} from './engine';

// Psevdo-3D yol parametrləri (klassik OutRun texnikası)
export const WIDTH = 320;
export const HEIGHT = 180;
export const SEGMENT_LENGTH = 200;
export const RUMBLE_LENGTH = 3;
export const ROAD_WIDTH = 2000;
export const LANES = 3;
export const CAMERA_HEIGHT = 1000;
export const FIELD_OF_VIEW = 100;
export const CAMERA_DEPTH = 1 / Math.tan((FIELD_OF_VIEW / 2) * Math.PI / 180);
export const DRAW_DISTANCE = 150;
export const PLAYER_Z = CAMERA_HEIGHT * CAMERA_DEPTH;
export const MAX_SPEED = SEGMENT_LENGTH * 60;
export const CRUISE_SPEED = MAX_SPEED * 0.5;

// Lövhə yaxınlaşanda kart bir az əvvəl açılır
const CHECKPOINT_LEAD = SEGMENT_LENGTH * 14;

const easeIn = (a: number, b: number, p: number) => a + (b - a) * Math.pow(p, 2);
const easeInOut = (a: number, b: number, p: number) => a + (b - a) * ((-Math.cos(p * Math.PI) / 2) + 0.5);

const hash = (n: number) => {
    const value = Math.sin(n * 91.7) * 47453.5453;
    return value - Math.floor(value);
};

const point = (y: number, z: number): IPoint => ({
    world: {x: 0, y, z},
    camera: {x: 0, y: 0, z: 0},
    screen: {x: 0, y: 0, w: 0, scale: 0},
});

// İşlər xronoloji ardıcıllıqla gəlir: hər iş üçün il tağı → döngə/təpə → lövhə.
// Sonda "İndi" finiş tağı, "Növbəti dayanacaq" lövhəsi və maşının dayanması üçün düz yol.
export const buildTrack = (jobs: IRoadJob[]): ITrack => {
    const segments: ISegment[] = [];
    const checkpoints: ICheckpoint[] = [];
    const placements: {index: number; sprite: IRoadSprite}[] = [];

    const lastY = () => (segments.length ? segments[segments.length - 1].p2.world.y : 0);

    const addSegment = (curve: number, y: number) => {
        const n = segments.length;
        segments.push({
            index: n,
            p1: point(lastY(), n * SEGMENT_LENGTH),
            p2: point(y, (n + 1) * SEGMENT_LENGTH),
            curve,
            sprites: [],
            dark: Math.floor(n / RUMBLE_LENGTH) % 2 === 1,
            clip: 0,
        });
    };

    const addRoad = (enter: number, hold: number, leave: number, curve: number, height: number) => {
        const startY = lastY();
        const endY = startY + height * SEGMENT_LENGTH;
        const total = enter + hold + leave;
        for (let n = 0; n < enter; n++) addSegment(easeIn(0, curve, n / enter), easeInOut(startY, endY, n / total));
        for (let n = 0; n < hold; n++) addSegment(curve, easeInOut(startY, endY, (enter + n) / total));
        for (let n = 0; n < leave; n++) addSegment(easeInOut(curve, 0, n / leave), easeInOut(startY, endY, (enter + hold + n) / total));
    };

    addRoad(10, 15, 10, 0, 0);

    jobs.forEach((job, i) => {
        const direction = i % 2 ? -1 : 1;

        placements.push({index: segments.length + 4, sprite: {kind: 'arch', imageKey: `year:${job.start}`, offset: 0, width: ROAD_WIDTH * 2.7}});
        addRoad(10, 10, 10, 0, 0);
        addRoad(15, 20, 15, direction * 4, i % 2 ? 20 : -20);

        const boardIndex = segments.length + 10;
        placements.push({index: boardIndex, sprite: {kind: 'billboard', imageKey: `job:${job.key}`, offset: direction * 1.9, width: 1900}});
        checkpoints.push({z: boardIndex * SEGMENT_LENGTH, type: 'job', jobKey: job.key});
        addRoad(10, 20, 10, 0, 0);
        addRoad(10, 15, 10, -direction * 3, 0);
    });

    const skipIndex = segments.length;
    const finishIndex = segments.length + 15;
    placements.push({index: finishIndex, sprite: {kind: 'finish', imageKey: 'finish', offset: 0, width: ROAD_WIDTH * 2.7}});
    const ctaIndex = finishIndex + 35;
    placements.push({index: ctaIndex, sprite: {kind: 'cta', imageKey: 'cta', offset: 1.9, width: 2100}});
    checkpoints.push({z: ctaIndex * SEGMENT_LENGTH, type: 'finish', jobKey: null});
    addRoad(10, 20, 10, 0, -lastY() / SEGMENT_LENGTH);
    addRoad(0, 200, 0, 0, 0);

    placements.forEach(({index, sprite}) => segments[index].sprites.push(sprite));

    // Yol kənarında ağaclar — lövhə və tağlardan uzaqda
    for (let n = 20; n < segments.length - 10; n += 5) {
        if (segments.slice(Math.max(0, n - 3), n + 4).some((segment) => segment.sprites.some((sprite) => sprite.kind !== 'tree'))) continue;
        const side = hash(n) > 0.5 ? 1 : -1;
        segments[n].sprites.push({kind: 'tree', imageKey: `tree${n % 2}`, offset: side * (1.5 + hash(n + 7) * 1.5), width: 650});
        if (hash(n + 3) > 0.6) {
            segments[n].sprites.push({kind: 'tree', imageKey: `tree${(n + 1) % 2}`, offset: -side * (2.2 + hash(n + 11) * 2), width: 750});
        }
    }

    return {
        segments,
        length: segments.length * SEGMENT_LENGTH,
        checkpoints,
        skipZ: skipIndex * SEGMENT_LENGTH,
    };
};

export const createRoadState = (track: ITrack): IRoadState => ({
    track,
    position: 0,
    speed: 0,
    playerX: 0,
    steer: 0,
    braking: false,
    skyOffset: 0,
    hillOffset: 0,
    time: 0,
    nextCheckpoint: 0,
    finished: false,
    stopped: false,
});

export const findSegment = (track: ITrack, z: number) => {
    const index = Math.floor(z / SEGMENT_LENGTH);
    return track.segments[Math.max(0, Math.min(track.segments.length - 1, index))];
};

export const checkpointLead = CHECKPOINT_LEAD;
