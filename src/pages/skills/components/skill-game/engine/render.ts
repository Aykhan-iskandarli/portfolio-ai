import colors from 'assets/styles/abstracts/color';
import {IBlock, IBox, IGameState, ILevelTheme} from './engine';
import {GROUND_Y, TILE, VIEW_HEIGHT} from './levels';
import {playerIdle, playerJump, playerPalette, playerRun, questionMark} from './sprites';

const backdrops: Record<ILevelTheme, {sky: string; far: string; ground: string; top: string}> = {
    day: {sky: colors.gameSkyDay, far: colors.gameHill, ground: colors.gameGround, top: colors.gameGrass},
    night: {sky: colors.gameSkyNight, far: colors.gameHillNight, ground: colors.gameGround, top: colors.gameGrass},
    cave: {sky: colors.gameSkyCave, far: colors.gameCaveWall, ground: colors.gameBrick, top: colors.gameGroundDark},
};

const rect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) => {
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x), Math.round(y), w, h);
};

const sprite = (ctx: CanvasRenderingContext2D, rows: string[], palette: Record<string, string>, x: number, y: number, flip = false) => {
    rows.forEach((row, rowIndex) => {
        for (let i = 0; i < row.length; i++) {
            const char = flip ? row[row.length - 1 - i] : row[i];
            if (char !== '.') rect(ctx, x + i, y + rowIndex, 1, 1, palette[char]);
        }
    });
};

// Deterministik "təsadüfi" ədəd — ulduzlar hər kadrda eyni yerdə qalsın
const hash = (n: number) => {
    const value = Math.sin(n * 127.1) * 43758.5453;
    return value - Math.floor(value);
};

const drawBackdrop = (ctx: CanvasRenderingContext2D, state: IGameState) => {
    const {theme} = state.level;
    const {sky, far} = backdrops[theme];
    const width = state.viewWidth;
    rect(ctx, 0, 0, width, VIEW_HEIGHT, sky);

    if (theme === 'night') {
        for (let i = 0; i < 40; i++) {
            const x = (hash(i) * 900 - state.cameraX * 0.1) % 900;
            const twinkle = Math.sin(state.time * 2 + i) > 0.7 ? 2 : 1;
            rect(ctx, (x + 900) % 900, hash(i + 50) * 110, twinkle, twinkle, colors.gameStar);
        }
        rect(ctx, width - 60, 24, 18, 18, colors.gameStar);
        rect(ctx, width - 54, 24, 12, 12, sky);
    }

    if (theme === 'day') {
        for (let i = 0; i < 6; i++) {
            const x = ((i * 170 - state.cameraX * 0.25) % 1020 + 1020) % 1020 - 60;
            const y = 24 + (i % 3) * 18;
            rect(ctx, x, y + 6, 44, 10, colors.gameCloud);
            rect(ctx, x + 10, y, 22, 8, colors.gameCloud);
        }
    }

    if (theme === 'cave') {
        for (let i = 0; i < 14; i++) {
            const x = ((i * 64 - state.cameraX * 0.3) % 896 + 896) % 896 - 32;
            rect(ctx, x, 0, 8, 10 + (i % 4) * 6, far);
            rect(ctx, x + 2, 10 + (i % 4) * 6, 4, 4, far);
        }
    }

    // Uzaq təpələr / qaya divarı (parallax)
    for (let i = 0; i < 8; i++) {
        const x = ((i * 140 - state.cameraX * 0.5) % 1120 + 1120) % 1120 - 80;
        const height = 26 + (i % 3) * 14;
        rect(ctx, x, GROUND_Y - height, 96, height, far);
        rect(ctx, x + 16, GROUND_Y - height - 10, 64, 10, far);
        rect(ctx, x + 32, GROUND_Y - height - 18, 32, 8, far);
    }
};

const drawGround = (ctx: CanvasRenderingContext2D, state: IGameState) => {
    const {ground: groundBox, theme} = state.level;
    const {ground, top} = backdrops[theme];
    rect(ctx, groundBox.x, groundBox.y, groundBox.w, groundBox.h, ground);
    rect(ctx, groundBox.x, groundBox.y, groundBox.w, 4, top);
    const start = Math.floor(state.cameraX / TILE) * TILE;
    for (let x = start; x < state.cameraX + state.viewWidth + TILE; x += TILE) {
        rect(ctx, x, groundBox.y + 4, 1, groundBox.h - 4, colors.gameGroundDark);
        rect(ctx, x + TILE / 2, groundBox.y + 18, 1, 14, colors.gameGroundDark);
        rect(ctx, x, groundBox.y + 17, TILE, 1, colors.gameGroundDark);
    }
};

const drawPipe = (ctx: CanvasRenderingContext2D, pipe: IBox) => {
    rect(ctx, pipe.x + 2, pipe.y + 8, pipe.w - 4, pipe.h - 8, colors.gamePipe);
    rect(ctx, pipe.x + 5, pipe.y + 8, 3, pipe.h - 8, colors.gamePipeLight);
    rect(ctx, pipe.x + pipe.w - 7, pipe.y + 8, 3, pipe.h - 8, colors.gamePipeDark);
    rect(ctx, pipe.x, pipe.y, pipe.w, 9, colors.gamePipe);
    rect(ctx, pipe.x + 3, pipe.y + 1, 3, 7, colors.gamePipeLight);
    rect(ctx, pipe.x, pipe.y + 8, pipe.w, 1, colors.gamePipeDark);
};

const drawBlock = (ctx: CanvasRenderingContext2D, block: IBlock, time: number) => {
    const offset = -Math.sin(block.bump * Math.PI) * 5;
    const y = block.y + offset;
    rect(ctx, block.x, y, block.w, block.h, colors.outline);
    if (block.used) {
        rect(ctx, block.x + 1, y + 1, block.w - 2, block.h - 2, colors.gameBlockUsed);
        [[3, 3], [11, 3], [3, 11], [11, 11]].forEach(([dx, dy]) => rect(ctx, block.x + dx, y + dy, 2, 2, colors.outline));
        return;
    }
    const shine = Math.sin(time * 4 + block.x) > 0.6;
    rect(ctx, block.x + 1, y + 1, block.w - 2, block.h - 2, shine ? colors.gameBlockLight : colors.gameBlock);
    rect(ctx, block.x + 1, y + 1, block.w - 2, 1, colors.gameBlockLight);
    sprite(ctx, questionMark, {'#': colors.woodDark}, block.x + 5, y + 4);
};

const drawFlag = (ctx: CanvasRenderingContext2D, state: IGameState) => {
    const {flagX, color} = state.level;
    rect(ctx, flagX - 4, GROUND_Y - 8, 10, 8, colors.outline);
    rect(ctx, flagX - 3, GROUND_Y - 7, 8, 6, colors.gameBlockUsed);
    rect(ctx, flagX, GROUND_Y - 120, 2, 112, colors.gamePole);
    rect(ctx, flagX - 2, GROUND_Y - 126, 6, 6, colors.gameBlock);
    const wave = Math.round(Math.sin(state.time * 6));
    for (let i = 0; i < 14; i++) {
        rect(ctx, flagX - 1 - i, GROUND_Y - 116 + i / 2 + (i > 6 ? wave : 0), 1, 14 - i, color);
    }
};

export const renderGame = (ctx: CanvasRenderingContext2D, state: IGameState) => {
    ctx.imageSmoothingEnabled = false;
    drawBackdrop(ctx, state);

    ctx.save();
    ctx.translate(-Math.round(state.cameraX), 0);
    drawGround(ctx, state);
    state.level.pipes.forEach((pipe) => drawPipe(ctx, pipe));
    drawFlag(ctx, state);
    state.level.blocks.forEach((block) => drawBlock(ctx, block, state.time));

    state.popups.forEach((popup) => {
        ctx.globalAlpha = Math.min(1, popup.life * 2);
        rect(ctx, popup.x - 4, popup.y - 8, 8, 8, colors.outline);
        rect(ctx, popup.x - 3, popup.y - 7, 6, 6, state.level.color);
        rect(ctx, popup.x - 2, popup.y - 6, 2, 2, colors.white);
        ctx.globalAlpha = 1;
    });

    const {player} = state;
    const frames = !player.onGround
        ? playerJump
        : Math.abs(player.vx) > 10 && Math.floor(player.runTime / 10) % 2 ? playerRun : playerIdle;
    sprite(ctx, frames, playerPalette, player.x - 1, player.y, player.facing < 0);
    ctx.restore();
};
