import colors from 'assets/styles/abstracts/color';
import fonts from 'assets/styles/abstracts/fonts';
import {IRoadJob, IRoadLabels} from './engine';

const boardColors = [colors.cartridgeExperience, colors.cartridgeAbout, colors.cartridgeSkills, colors.cartridgeContact];

const createCanvas = (width: number, height: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;
    ctx.imageSmoothingEnabled = false;
    return {canvas, ctx};
};

// Mətni verilən enə sığana qədər kiçildir
const fitText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number, size: number, y: number, x: number) => {
    let current = size;
    ctx.font = `700 ${current}px ${fonts.fontPixel}`;
    while (ctx.measureText(text).width > maxWidth && current > 8) {
        current -= 1;
        ctx.font = `700 ${current}px ${fonts.fontPixel}`;
    }
    ctx.fillText(text, x, y);
};

const createBillboard = (title: string, subtitle: string, color: string) => {
    const {canvas, ctx} = createCanvas(128, 88);
    ctx.fillStyle = colors.roadTrunk;
    ctx.fillRect(28, 56, 6, 32);
    ctx.fillRect(94, 56, 6, 32);
    ctx.fillStyle = colors.outline;
    ctx.fillRect(0, 0, 128, 60);
    ctx.fillStyle = color;
    ctx.fillRect(3, 3, 122, 54);
    ctx.fillStyle = colors.cartridgeLabel;
    ctx.fillRect(8, 14, 112, 38);
    ctx.fillStyle = colors.outline;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    fitText(ctx, title, 104, 16, 28, 64);
    ctx.fillStyle = colors.woodDark;
    fitText(ctx, subtitle, 104, 11, 43, 64);
    ctx.fillStyle = colors.white;
    [10, 30, 50, 70, 90, 110].forEach((x) => ctx.fillRect(x, 6, 6, 4));
    return canvas;
};

const createArch = (label: string, checkered: boolean) => {
    const {canvas, ctx} = createCanvas(216, 104);
    ctx.fillStyle = colors.outline;
    ctx.fillRect(4, 0, 12, 104);
    ctx.fillRect(200, 0, 12, 104);
    ctx.fillStyle = colors.gamePole;
    ctx.fillRect(6, 0, 8, 104);
    ctx.fillRect(202, 0, 8, 104);
    ctx.fillStyle = colors.outline;
    ctx.fillRect(0, 2, 216, 30);
    if (checkered) {
        for (let x = 0; x < 212; x += 8) {
            for (let y = 0; y < 26; y += 8) {
                ctx.fillStyle = (x / 8 + y / 8) % 2 ? colors.white : colors.outline;
                ctx.fillRect(2 + x, 4 + y, 8, 8);
            }
        }
        ctx.fillStyle = colors.roadRumbleDark;
        ctx.fillRect(76, 4, 64, 26);
    } else {
        ctx.fillStyle = colors.roadRumbleDark;
        ctx.fillRect(2, 4, 212, 26);
    }
    ctx.fillStyle = colors.white;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    fitText(ctx, label, checkered ? 60 : 200, 20, 18, 108);
    return canvas;
};

const createTree = (variant: number) => {
    const {canvas, ctx} = createCanvas(32, 52);
    ctx.fillStyle = colors.roadTrunk;
    ctx.fillRect(13, 38, 6, 14);
    const layers = variant ? [[16, 0, 4], [12, 8, 8], [8, 16, 12], [4, 24, 16]] : [[14, 2, 6], [10, 10, 10], [6, 18, 14], [2, 26, 18]];
    layers.forEach(([x, y, half]) => {
        ctx.fillStyle = colors.roadTree;
        ctx.fillRect(x - (half - 4), y, (half - 4) * 2 + 4, 14);
        ctx.fillStyle = colors.roadTreeLight;
        ctx.fillRect(x - (half - 4), y, half - 2, 4);
    });
    return canvas;
};

export const createRoadImages = (jobs: IRoadJob[], labels: IRoadLabels): Record<string, HTMLCanvasElement> => {
    const images: Record<string, HTMLCanvasElement> = {
        tree0: createTree(0),
        tree1: createTree(1),
        finish: createArch(labels.now, true),
        cta: createBillboard(labels.nextStop, labels.yourTeam, colors.primary),
    };
    jobs.forEach((job, index) => {
        images[`job:${job.key}`] = createBillboard(job.company, `${job.start} — ${job.end ?? labels.now}`, boardColors[index % boardColors.length]);
        images[`year:${job.start}`] = createArch(job.start, false);
    });
    return images;
};
