import {IRoadEvent, IRoadInput, IRoadState} from './engine';
import {checkpointLead, CRUISE_SPEED, findSegment, MAX_SPEED, PLAYER_Z, SEGMENT_LENGTH} from './track';

const ACCELERATION = MAX_SPEED / 4;
const BRAKING = MAX_SPEED / 2.5;
const CENTRIFUGAL = 0.3;
const AUTO_CENTER = 1.6;

// Maşın özü sürür (cruise). İstifadəçi zolaq dəyişə, sürətlənə və ya yavaşlaya bilər.
export const stepRoad = (state: IRoadState, input: IRoadInput, dt: number): IRoadEvent[] => {
    const events: IRoadEvent[] = [];
    const {track} = state;
    const segment = findSegment(track, state.position + PLAYER_Z);
    const speedPercent = state.speed / MAX_SPEED;
    const dx = dt * 2 * speedPercent;

    state.time += dt;
    state.position = Math.min(state.position + dt * state.speed, track.length - PLAYER_Z - SEGMENT_LENGTH * 2);
    state.skyOffset += 0.0015 * segment.curve * speedPercent;
    state.hillOffset += 0.003 * segment.curve * speedPercent;

    if (input.left && !state.finished) {
        state.playerX -= dx;
        state.steer = -1;
    } else if (input.right && !state.finished) {
        state.playerX += dx;
        state.steer = 1;
    } else {
        state.steer = 0;
        state.playerX -= state.playerX * Math.min(1, dt * AUTO_CENTER) * speedPercent;
    }
    state.playerX -= dx * speedPercent * segment.curve * CENTRIFUGAL;
    state.playerX = Math.max(-2, Math.min(2, state.playerX));

    let target = CRUISE_SPEED;
    if (input.up) target = MAX_SPEED;
    if (input.down) target = MAX_SPEED * 0.2;
    if (Math.abs(state.playerX) > 1) target = Math.min(target, MAX_SPEED * 0.25);
    if (state.finished) target = 0;

    state.braking = target < state.speed - 1;
    state.speed = target > state.speed
        ? Math.min(target, state.speed + ACCELERATION * dt)
        : Math.max(target, state.speed - BRAKING * dt);

    const front = state.position + PLAYER_Z;
    while (state.nextCheckpoint < track.checkpoints.length && front >= track.checkpoints[state.nextCheckpoint].z - checkpointLead) {
        const checkpoint = track.checkpoints[state.nextCheckpoint];
        state.nextCheckpoint += 1;
        if (checkpoint.type === 'job' && checkpoint.jobKey) {
            events.push({type: 'job', jobKey: checkpoint.jobKey});
        } else {
            state.finished = true;
            events.push({type: 'finish'});
        }
    }

    if (state.finished && !state.stopped && state.speed < 1) {
        state.stopped = true;
        events.push({type: 'stopped'});
    }

    return events;
};

// "Sona keç": son işin lövhəsindən sonraya atlayır, keçilmiş bütün işlər üçün hadisə qaytarır
export const skipRoad = (state: IRoadState): IRoadEvent[] => {
    const events: IRoadEvent[] = [];
    state.position = Math.max(state.position, state.track.skipZ - PLAYER_Z);
    state.playerX = 0;
    state.speed = Math.max(state.speed, CRUISE_SPEED);
    while (state.nextCheckpoint < state.track.checkpoints.length && state.track.checkpoints[state.nextCheckpoint].type === 'job') {
        const {jobKey} = state.track.checkpoints[state.nextCheckpoint];
        state.nextCheckpoint += 1;
        if (jobKey) events.push({type: 'job', jobKey});
    }
    return events;
};
