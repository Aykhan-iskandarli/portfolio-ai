import {createUseStyles} from 'react-jss';
import colors from 'assets/styles/abstracts/color';

const noise = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.9'/%3E%3C/svg%3E")`;

const styles = {
    '@keyframes crtStatic': {
        '0%': {backgroundPosition: '0 0'},
        '25%': {backgroundPosition: '-30px 20px'},
        '50%': {backgroundPosition: '20px -40px'},
        '75%': {backgroundPosition: '-50px -10px'},
        '100%': {backgroundPosition: '10px 30px'},
    },
    crt: {
        position: 'absolute',
        borderRadius: 16,
        overflow: 'hidden',
        pointerEvents: 'none',
    },
    glow: {
        position: 'absolute',
        inset: 0,
        backgroundColor: colors.screenBg,
        boxShadow: `inset 0 0 30px ${colors.screenGlow}55, 0 0 40px ${colors.screenGlow}44`,
        '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 50%, var(--crt-color) 0%, transparent 70%)',
            opacity: 0.3,
        },
        '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: `repeating-linear-gradient(0deg, ${colors.black}33 0px, ${colors.black}33 1px, transparent 1px, transparent 3px)`,
        },
    },
    line: {
        position: 'absolute',
        inset: 0,
        backgroundColor: colors.white,
        opacity: 0.85,
        transformOrigin: 'center',
    },
    staticNoise: {
        position: 'absolute',
        inset: -60,
        backgroundImage: noise,
        opacity: 0.35,
        mixBlendMode: 'screen',
        animation: '$crtStatic 0.2s steps(4) infinite',
    },
};

// @ts-ignore
export const useCrtStyles = createUseStyles(styles);
