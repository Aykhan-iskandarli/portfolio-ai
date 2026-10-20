import {IBlock, IBox, IGameEvent, IGameInput, IGameState} from './engine';

const GRAVITY = 900;
const MAX_FALL = 420;
const MOVE_SPEED = 110;
const ACCELERATION = 900;
const FRICTION = 1100;
const JUMP_SPEED = -330;
const JUMP_CUT = -140;
const JUMP_BUFFER = 0.12;
const COYOTE_TIME = 0.08;

const overlaps = (a: IBox, b: IBox) => {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
};

// Bir kadr: hərəkət → toqquşma → bloka zərbə → bayraq. Hadisələr (səs, skill açılması) geri qaytarılır.
export const stepGame = (state: IGameState, input: IGameInput, dt: number): IGameEvent[] => {
    const events: IGameEvent[] = [];
    const {player, level} = state;
    const solids: (IBox | IBlock)[] = [level.ground, ...level.pipes, ...level.blocks];

    state.time += dt;

    const direction = (input.right ? 1 : 0) - (input.left ? 1 : 0);
    if (direction) {
        player.vx += direction * ACCELERATION * dt;
        player.facing = direction > 0 ? 1 : -1;
    } else {
        const slow = FRICTION * dt;
        player.vx = Math.abs(player.vx) <= slow ? 0 : player.vx - Math.sign(player.vx) * slow;
    }
    player.vx = Math.max(-MOVE_SPEED, Math.min(MOVE_SPEED, player.vx));

    if (input.jumpPressed) {
        player.jumpBuffer = JUMP_BUFFER;
        input.jumpPressed = false;
    }
    player.jumpBuffer -= dt;
    player.coyote = player.onGround ? COYOTE_TIME : player.coyote - dt;

    if (player.jumpBuffer > 0 && player.coyote > 0) {
        player.vy = JUMP_SPEED;
        player.jumpBuffer = 0;
        player.coyote = 0;
        events.push({type: 'jump'});
    }
    if (!input.jump && player.vy < JUMP_CUT) {
        player.vy = JUMP_CUT;
    }
    player.vy = Math.min(player.vy + GRAVITY * dt, MAX_FALL);

    player.x += player.vx * dt;
    solids.forEach((solid) => {
        if (!overlaps(player, solid)) return;
        player.x = player.vx > 0 ? solid.x - player.w : solid.x + solid.w;
        player.vx = 0;
    });
    player.x = Math.max(0, Math.min(level.width - player.w, player.x));

    player.y += player.vy * dt;
    player.onGround = false;
    let hitBlock: IBlock | null = null;
    const rising = player.vy < 0;
    for (const solid of solids) {
        if (!overlaps(player, solid)) continue;
        if (!rising) {
            player.y = solid.y - player.h;
            player.onGround = true;
        } else {
            player.y = solid.y + solid.h;
            if ('skillKey' in solid) {
                // Bir neçə blok eyni anda toxunursa, mərkəzə ən yaxın olanı sayılır
                const center = player.x + player.w / 2;
                const distance = Math.abs(solid.x + solid.w / 2 - center);
                if (!hitBlock || distance < Math.abs(hitBlock.x + hitBlock.w / 2 - center)) {
                    hitBlock = solid;
                }
            }
        }
        player.vy = 0;
    }

    if (hitBlock) {
        hitBlock.bump = 1;
        if (!hitBlock.used) {
            hitBlock.used = true;
            state.popups.push({x: hitBlock.x + hitBlock.w / 2, y: hitBlock.y - 4, life: 0.8});
            events.push({type: 'block', skillKey: hitBlock.skillKey});
        }
    }

    level.blocks.forEach((block) => {
        block.bump = Math.max(0, block.bump - dt * 6);
    });
    state.popups = state.popups
        .map((popup) => ({...popup, y: popup.y - 50 * dt, life: popup.life - dt}))
        .filter((popup) => popup.life > 0);

    player.runTime = player.onGround ? player.runTime + Math.abs(player.vx) * dt : player.runTime;

    const target = player.x - state.viewWidth * 0.4;
    state.cameraX = Math.max(0, Math.min(level.width - state.viewWidth, target));

    if (!state.cleared && player.x + player.w >= level.flagX) {
        state.cleared = true;
        events.push({type: 'flag'});
    }

    return events;
};
