import SkillGroupModel from '../../../models/skill-group.model';
import {IGameState, ILevel, ILevelTheme} from './engine';

// Məntiqi ekran ölçüsü (piksel). Canvas CSS ilə böyüdülür, image-rendering: pixelated.
export const TILE = 16;
export const VIEW_HEIGHT = 208;
export const VIEW_WIDTH_WIDE = 384;
export const VIEW_WIDTH_NARROW = 256;
export const GROUND_Y = 176;

const themes: ILevelTheme[] = ['day', 'night', 'cave'];

// Bloklar 4 tile aralıqla düzülür, tək indeksli bloklar bir tile yuxarıda olur.
// Hər ikinci blokdan sonra 2 tile hündürlüyündə boru gəlir — üstündən tullanmaq lazımdır.
export const createLevel = (group: SkillGroupModel, index: number, color: string, unlocked: string[]): ILevel => {
    const count = group.items.length;
    const width = (6 + count * 4 + 8) * TILE;

    const blocks = group.items.map((skill, i) => ({
        x: (6 + i * 4) * TILE,
        y: (i % 2 ? 6 : 7) * TILE,
        w: TILE,
        h: TILE,
        skillKey: skill.key ?? '',
        used: unlocked.includes(skill.key ?? ''),
        bump: 0,
    }));

    const pipes = group.items
        .slice(0, -1)
        .map((_, i) => i)
        .filter((i) => i % 2 === 1)
        .map((i) => ({x: (8 + i * 4) * TILE, y: GROUND_Y - TILE * 2, w: TILE * 2, h: TILE * 2}));

    return {
        groupKey: group.key ?? '',
        theme: themes[index % themes.length],
        color,
        width,
        ground: {x: 0, y: GROUND_Y, w: width, h: VIEW_HEIGHT - GROUND_Y},
        pipes,
        blocks,
        flagX: width - 5 * TILE,
    };
};

export const createGameState = (level: ILevel, viewWidth: number): IGameState => ({
    level,
    viewWidth,
    player: {
        x: TILE * 2,
        y: GROUND_Y - 16,
        w: 10,
        h: 16,
        vx: 0,
        vy: 0,
        onGround: true,
        facing: 1,
        runTime: 0,
        jumpBuffer: 0,
        coyote: 0,
    },
    popups: [],
    cameraX: 0,
    time: 0,
    cleared: false,
});
