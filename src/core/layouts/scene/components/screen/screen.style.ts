import {createUseStyles} from 'react-jss';
import colors from 'assets/styles/abstracts/color';
import fonts from 'assets/styles/abstracts/fonts';
import sizes from 'assets/styles/abstracts/sizes';
import {rem} from 'assets/styles/abstracts/functions';
import {breakpoint, transition} from 'assets/styles/abstracts/mixins';

const styles = {
    screen: {
        position: 'fixed',
        inset: 0,
        zIndex: 30,
        backgroundColor: colors.screenBg,
        color: colors.text,
    },
    scroll: {
        position: 'absolute',
        inset: 0,
        overflowY: 'auto',
        overscrollBehavior: 'contain',
        outline: 'none',
        scrollbarColor: `${colors.screenBorder} transparent`,
    },
    inner: {
        width: '100%',
        maxWidth: rem(sizes.container),
        margin: [0, 'auto'],
        padding: [rem(104), rem(40), rem(72)],
        [breakpoint(sizes.breakpoint)]: {
            padding: [rem(88), rem(20), rem(56)],
        },
    },
    // Dekorativ CRT çərçivəsi: əyri künclər, kənarlarda scanline və parıltı (mərkəz təmiz qalır)
    frame: {
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        borderRadius: rem(28),
        boxShadow: `0 0 0 ${rem(40)} ${colors.tvDark}, inset 0 0 0 ${rem(6)} ${colors.outline}, inset 0 0 ${rem(90)} ${colors.black}99, inset 0 0 ${rem(36)} ${colors.screenGlow}22`,
        '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            background: `repeating-linear-gradient(0deg, ${colors.white}0A 0px, ${colors.white}0A 1px, transparent 1px, transparent 4px)`,
            maskImage: 'radial-gradient(ellipse at center, transparent 55%, black 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 55%, black 100%)',
        },
        [breakpoint(sizes.breakpoint)]: {
            borderRadius: rem(18),
        },
    },
    eject: {
        position: 'fixed',
        top: rem(16),
        right: rem(16),
        zIndex: 40,
        display: 'inline-flex',
        alignItems: 'center',
        gap: rem(8),
        minHeight: rem(sizes.touch),
        padding: [0, rem(16)],
        border: `${rem(2)} solid ${colors.screenBorder}`,
        borderRadius: rem(sizes.radius),
        backgroundColor: colors.screenSurface,
        color: colors.text,
        fontFamily: fonts.fontPixel,
        fontSize: rem(16),
        cursor: 'pointer',
        transition: transition('background-color', 0.2),
        '& svg': {
            fontSize: rem(20),
        },
        '&:hover': {
            backgroundColor: colors.screenSurfaceHover,
        },
        [breakpoint(sizes.breakpointSmall)]: {
            top: rem(12),
            right: rem(12),
            width: rem(sizes.touch),
            padding: 0,
            justifyContent: 'center',
            '& span': {
                display: 'none',
            },
        },
    },
};

// @ts-ignore
export const useScreenStyles = createUseStyles(styles);
