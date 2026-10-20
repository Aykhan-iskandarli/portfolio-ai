import colors from 'assets/styles/abstracts/color';
import {IPoint, IRoadPalette, IRoadState} from './engine';
import {getPalette} from './palette';
import {CAMERA_DEPTH, CAMERA_HEIGHT, DRAW_DISTANCE, findSegment, HEIGHT, LANES, MAX_SPEED, PLAYER_Z, ROAD_WIDTH, SEGMENT_LENGTH, WIDTH} from './track';

const hash = (n: number) => {
    const value = Math.sin(n * 12.9898) * 43758.5453;
    return value - Math.floor(value);
};

const mountainPeaks = Array.from({length: 24}).map((_, i) => 18 + hash(i) * 34);
const hillPeaks = Array.from({length: 18}).map((_, i) => 8 + hash(i + 40) * 16);

const project = (p: IPoint, cameraX: number, cameraY: number, cameraZ: number) => {
    p.camera.x = p.world.x - cameraX;
    p.camera.y = p.world.y - cameraY;
    p.camera.z = p.world.z - cameraZ;
    p.screen.scale = CAMERA_DEPTH / p.camera.z;
    p.screen.x = Math.round(WIDTH / 2 + p.screen.scale * p.camera.x * WIDTH / 2);
    p.screen.y = Math.round(HEIGHT / 2 - p.screen.scale * p.camera.y * HEIGHT / 2);
    p.screen.w = Math.round(p.screen.scale * ROAD_WIDTH * WIDTH / 2);
};

const polygon = (ctx: CanvasRenderingContext2D, points: number[], color: string) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(points[0], points[1]);
    for (let i = 2; i < points.length; i += 2) ctx.lineTo(points[i], points[i + 1]);
    ctx.closePath();
    ctx.fill();
};

// Silsilə: təkrarlanan zirvələr, offset ilə sürüşür (parallax)
const ridge = (ctx: CanvasRenderingContext2D, peaks: number[], baseY: number, step: number, offset: number, color: string) => {
    const span = peaks.length * step;
    const shift = ((offset * WIDTH) % span + span) % span;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, HEIGHT);
    for (let x = -step; x <= WIDTH + step; x += step / 2) {
        const index = Math.floor((x + shift) / step);
        const peak = peaks[((index % peaks.length) + peaks.length) % peaks.length];
        const isPeak = Math.round((x + shift) / (step / 2)) % 2 === 0;
        ctx.lineTo(x, baseY - (isPeak ? peak : peak * 0.35));
    }
    ctx.lineTo(WIDTH, HEIGHT);
    ctx.closePath();
    ctx.fill();
};

const drawBackground = (ctx: CanvasRenderingContext2D, state: IRoadState, palette: IRoadPalette, progress: number) => {
    const sky = ctx.createLinearGradient(0, 0, 0, HEIGHT / 2 + 10);
    sky.addColorStop(0, palette.skyTop);
    sky.addColorStop(1, palette.skyBottom);
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    const sunX = ((WIDTH * 0.72 - state.skyOffset * WIDTH) % (WIDTH * 1.5) + WIDTH * 1.5) % (WIDTH * 1.5) - WIDTH * 0.25;
    const sunY = HEIGHT / 2 - 12 - Math.sin(progress * Math.PI) * 44;
    ctx.fillStyle = palette.sun;
    ctx.beginPath();
    ctx.arc(Math.round(sunX), Math.round(sunY), 14, 0, Math.PI * 2);
    ctx.fill();

    ridge(ctx, mountainPeaks, HEIGHT / 2 + 8, 40, state.skyOffset, palette.mountain);
    ridge(ctx, hillPeaks, HEIGHT / 2 + 12, 28, state.hillOffset, palette.hill);
};

const drawSegment = (ctx: CanvasRenderingContext2D, p1: IPoint, p2: IPoint, dark: boolean, palette: IRoadPalette) => {
    const {x: x1, y: y1, w: w1} = p1.screen;
    const {x: x2, y: y2, w: w2} = p2.screen;
    const r1 = w1 / Math.max(6, 2 * LANES);
    const r2 = w2 / Math.max(6, 2 * LANES);
    const l1 = w1 / Math.max(32, 8 * LANES);
    const l2 = w2 / Math.max(32, 8 * LANES);

    ctx.fillStyle = dark ? palette.grassDark : palette.grass;
    ctx.fillRect(0, y2, WIDTH, y1 - y2);

    const rumble = dark ? colors.roadRumbleDark : colors.roadRumble;
    polygon(ctx, [x1 - w1 - r1, y1, x1 - w1, y1, x2 - w2, y2, x2 - w2 - r2, y2], rumble);
    polygon(ctx, [x1 + w1 + r1, y1, x1 + w1, y1, x2 + w2, y2, x2 + w2 + r2, y2], rumble);
    polygon(ctx, [x1 - w1, y1, x1 + w1, y1, x2 + w2, y2, x2 - w2, y2], dark ? colors.roadAsphaltDark : colors.roadAsphalt);

    if (!dark) {
        const laneW1 = (w1 * 2) / LANES;
        const laneW2 = (w2 * 2) / LANES;
        let laneX1 = x1 - w1 + laneW1;
        let laneX2 = x2 - w2 + laneW2;
        for (let lane = 1; lane < LANES; lane++) {
            polygon(ctx, [laneX1 - l1 / 2, y1, laneX1 + l1 / 2, y1, laneX2 + l2 / 2, y2, laneX2 - l2 / 2, y2], colors.roadLane);
            laneX1 += laneW1;
            laneX2 += laneW2;
        }
    }
};

const drawCar = (ctx: CanvasRenderingContext2D, state: IRoadState) => {
    const speedPercent = state.speed / MAX_SPEED;
    const bounce = speedPercent > 0.05 && Math.sin(state.time * 28) > 0 ? 1 : 0;
    const x = Math.round(WIDTH / 2);
    const y = HEIGHT - 6 - bounce;
    const lean = state.steer * 2;
    const rect = (rx: number, ry: number, w: number, h: number, color: string) => {
        ctx.fillStyle = color;
        ctx.fillRect(x + rx, y + ry, w, h);
    };

    rect(-25, 0, 50, 4, `${colors.black}55`);
    rect(-23, -10, 9, 11, colors.roadTyre);
    rect(14, -10, 9, 11, colors.roadTyre);
    rect(-22, -18, 44, 12, colors.roadCar);
    rect(-22, -8, 44, 3, colors.roadCarDark);
    rect(-16 + lean, -28, 32, 11, colors.roadCar);
    rect(-13 + lean, -26, 26, 7, colors.roadCarGlass);
    rect(-11 + lean, -26, 6, 2, `${colors.white}55`);
    rect(-20, -16, 8, 4, state.braking ? colors.roadRumbleDark : colors.roadCarDark);
    rect(12, -16, 8, 4, state.braking ? colors.roadRumbleDark : colors.roadCarDark);
    if (state.braking) {
        rect(-21, -17, 10, 6, `${colors.roadRumbleDark}55`);
        rect(11, -17, 10, 6, `${colors.roadRumbleDark}55`);
    }
    rect(-6, -14, 12, 5, colors.roadRumble);
    rect(-18, -20, 36, 2, colors.roadCarLight);
};

// 0 → start, 1 → "Növbəti dayanacaq" lövhəsi
export const getRoadProgress = (state: IRoadState) => {
    const {checkpoints, length} = state.track;
    const end = checkpoints.length ? checkpoints[checkpoints.length - 1].z : length;
    return Math.max(0, Math.min(1, (state.position + PLAYER_Z) / end));
};

export const renderRoad = (ctx: CanvasRenderingContext2D, state: IRoadState, images: Record<string, HTMLCanvasElement>) => {
    const {track} = state;
    const progress = getRoadProgress(state);
    const palette = getPalette(progress);
    ctx.imageSmoothingEnabled = false;

    drawBackground(ctx, state, palette, progress);

    const baseSegment = findSegment(track, state.position);
    const basePercent = (state.position % SEGMENT_LENGTH) / SEGMENT_LENGTH;
    const playerSegment = findSegment(track, state.position + PLAYER_Z);
    const playerPercent = ((state.position + PLAYER_Z) % SEGMENT_LENGTH) / SEGMENT_LENGTH;
    const playerY = playerSegment.p1.world.y + (playerSegment.p2.world.y - playerSegment.p1.world.y) * playerPercent;

    let maxY = HEIGHT;
    let x = 0;
    let dx = -(baseSegment.curve * basePercent);
    const last = Math.min(track.segments.length, baseSegment.index + DRAW_DISTANCE);

    for (let i = baseSegment.index; i < last; i++) {
        const segment = track.segments[i];
        project(segment.p1, state.playerX * ROAD_WIDTH - x, playerY + CAMERA_HEIGHT, state.position);
        project(segment.p2, state.playerX * ROAD_WIDTH - x - dx, playerY + CAMERA_HEIGHT, state.position);
        x += dx;
        dx += segment.curve;
        segment.clip = maxY;

        if (segment.p1.camera.z <= CAMERA_DEPTH || segment.p2.screen.y >= segment.p1.screen.y || segment.p2.screen.y >= maxY) continue;
        drawSegment(ctx, segment.p1, segment.p2, segment.dark, palette);
        maxY = segment.p1.screen.y;
    }

    // Sprite-lar arxadan önə
    for (let i = last - 1; i > baseSegment.index; i--) {
        const segment = track.segments[i];
        const scale = segment.p1.screen.scale;
        if (scale <= 0) continue;
        segment.sprites.forEach((sprite) => {
            const image = images[sprite.imageKey];
            if (!image) return;
            const destW = sprite.width * scale * WIDTH / 2;
            const destH = destW * image.height / image.width;
            const destX = segment.p1.screen.x + scale * sprite.offset * ROAD_WIDTH * WIDTH / 2 - destW / 2;
            const destY = segment.p1.screen.y - destH;
            const clipH = Math.max(0, destY + destH - segment.clip);
            if (clipH >= destH || destW < 1) return;
            ctx.drawImage(image, 0, 0, image.width, image.height - (image.height * clipH) / destH, destX, destY, destW, destH - clipH);
        });
    }

    drawCar(ctx, state);
};
