import colors from 'assets/styles/abstracts/color';
import {IRoadPalette} from './engine';

const dawn: IRoadPalette = {
    skyTop: colors.roadDawnSkyTop,
    skyBottom: colors.roadDawnSkyBottom,
    sun: colors.roadDawnSun,
    mountain: colors.roadDawnMountain,
    hill: colors.roadDawnHill,
    grass: colors.roadDawnGrass,
    grassDark: colors.roadDawnGrassDark,
};

const day: IRoadPalette = {
    skyTop: colors.roadDaySkyTop,
    skyBottom: colors.roadDaySkyBottom,
    sun: colors.roadDaySun,
    mountain: colors.roadDayMountain,
    hill: colors.roadDayHill,
    grass: colors.roadDayGrass,
    grassDark: colors.roadDayGrassDark,
};

const dusk: IRoadPalette = {
    skyTop: colors.roadDuskSkyTop,
    skyBottom: colors.roadDuskSkyBottom,
    sun: colors.roadDuskSun,
    mountain: colors.roadDuskMountain,
    hill: colors.roadDuskHill,
    grass: colors.roadDuskGrass,
    grassDark: colors.roadDuskGrassDark,
};

const toRgb = (hex: string) => {
    const value = parseInt(hex.slice(1), 16);
    return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
};

const mix = (a: string, b: string, t: number) => {
    const from = toRgb(a);
    const to = toRgb(b);
    const channel = (i: number) => Math.round(from[i] + (to[i] - from[i]) * t);
    return `rgb(${channel(0)}, ${channel(1)}, ${channel(2)})`;
};

const mixPalette = (a: IRoadPalette, b: IRoadPalette, t: number): IRoadPalette => {
    const result = {} as IRoadPalette;
    (Object.keys(a) as (keyof IRoadPalette)[]).forEach((key) => {
        result[key] = mix(a[key], b[key], t);
    });
    return result;
};

// Yolun irəliləyişinə görə (0 → 1) səhər → gündüz → gün batımı
export const getPalette = (progress: number): IRoadPalette => {
    const p = Math.max(0, Math.min(1, progress));
    return p < 0.5 ? mixPalette(dawn, day, p * 2) : mixPalette(day, dusk, (p - 0.5) * 2);
};
