import {store} from 'store/store.config';

// Səs effektləri Web Audio ilə yaradılır — ayrıca audio faylı yüklənmir.
// Default olaraq söndürülüb (store → soundEnabled).
let context: AudioContext | null = null;

const getContext = () => {
    if (!store.getState().soundEnabled) return null;
    if (!context) {
        const AudioCtx = window.AudioContext || (window as unknown as {webkitAudioContext: typeof AudioContext}).webkitAudioContext;
        if (!AudioCtx) return null;
        context = new AudioCtx();
    }
    if (context.state === 'suspended') {
        context.resume();
    }
    return context;
};

const tone = (ctx: AudioContext, frequency: number, start: number, duration: number, type: OscillatorType, volume: number) => {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime + start);
    gain.gain.setValueAtTime(volume, ctx.currentTime + start);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + duration);
    oscillator.connect(gain).connect(ctx.destination);
    oscillator.start(ctx.currentTime + start);
    oscillator.stop(ctx.currentTime + start + duration);
};

const noise = (ctx: AudioContext, duration: number, volume: number) => {
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * duration), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    }
    const source = ctx.createBufferSource();
    const gain = ctx.createGain();
    gain.gain.value = volume;
    source.buffer = buffer;
    source.connect(gain).connect(ctx.destination);
    source.start();
};

export const playInsert = () => {
    const ctx = getContext();
    if (!ctx) return;
    tone(ctx, 180, 0, 0.08, 'square', 0.08);
    tone(ctx, 120, 0.07, 0.1, 'square', 0.06);
};

export const playCrtOn = () => {
    const ctx = getContext();
    if (!ctx) return;
    noise(ctx, 0.35, 0.05);
    tone(ctx, 15000, 0, 0.6, 'sine', 0.01);
};

export const playEject = () => {
    const ctx = getContext();
    if (!ctx) return;
    tone(ctx, 140, 0, 0.07, 'square', 0.07);
    tone(ctx, 220, 0.06, 0.09, 'square', 0.05);
};
