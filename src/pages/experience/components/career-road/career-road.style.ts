import {createUseStyles} from 'react-jss';
import colors from 'assets/styles/abstracts/color';
import fonts from 'assets/styles/abstracts/fonts';
import sizes from 'assets/styles/abstracts/sizes';
import {rem} from 'assets/styles/abstracts/functions';
import {breakpoint} from 'assets/styles/abstracts/mixins';

const touchOnly = '@media (hover: none) and (pointer: coarse)';
const fineOnly = '@media (hover: hover) and (pointer: fine)';

const styles = {
    '@keyframes cardIn': {
        '0%': {transform: `translateX(${rem(-16)})`, opacity: 0},
        '100%': {transform: 'translateX(0)', opacity: 1},
    },
    road: {
        marginBottom: rem(48),
    },
    frame: {
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 9',
        overflow: 'hidden',
        border: `${rem(4)} solid ${colors.outline}`,
        borderRadius: rem(sizes.radius),
        boxShadow: `0 0 0 ${rem(3)} ${colors.screenBorder}, 0 ${rem(12)} ${rem(32)} ${colors.black}66`,
        backgroundColor: colors.roadDawnSkyTop,
        outline: 'none',
        '&:focus-visible': {
            boxShadow: `0 0 0 ${rem(4)} ${colors.focus}`,
        },
    },
    canvas: {
        display: 'block',
        width: '100%',
        height: '100%',
        imageRendering: 'pixelated',
    },
    overlay: {
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: rem(14),
        padding: rem(20),
        textAlign: 'center',
        backgroundColor: `${colors.screenBg}B3`,
    },
    overlayLight: {
        backgroundColor: `${colors.screenBg}66`,
    },
    overlayTitle: {
        fontFamily: fonts.fontPixel,
        fontSize: rem(34),
        lineHeight: 1.15,
        color: colors.cartridgeExperience,
        textShadow: `${rem(3)} ${rem(3)} 0 ${colors.outline}`,
        [breakpoint(sizes.breakpointSmall)]: {
            fontSize: rem(22),
        },
    },
    subtitle: {
        maxWidth: rem(520),
        color: colors.text,
        fontSize: rem(sizes.large),
        [breakpoint(sizes.breakpointSmall)]: {
            fontSize: rem(sizes.small),
        },
    },
    hint: {
        fontSize: rem(sizes.small),
        color: colors.textMuted,
    },
    hintKeys: {
        [touchOnly]: {display: 'none'},
    },
    hintTouch: {
        [fineOnly]: {display: 'none'},
    },
    actions: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: rem(12),
    },
    hud: {
        position: 'absolute',
        top: rem(10),
        left: rem(10),
        right: rem(10),
        display: 'flex',
        alignItems: 'center',
        gap: rem(8),
    },
    progress: {
        flex: 1,
        height: rem(10),
        border: `${rem(2)} solid ${colors.outline}`,
        borderRadius: rem(6),
        backgroundColor: `${colors.outline}88`,
        overflow: 'hidden',
    },
    progressFill: {
        display: 'block',
        width: 0,
        height: '100%',
        backgroundColor: colors.cartridgeExperience,
    },
    hudButton: {
        minHeight: rem(32),
        padding: [0, rem(12)],
        border: `${rem(2)} solid ${colors.outline}`,
        borderRadius: rem(6),
        backgroundColor: colors.cartridgeLabel,
        color: colors.outline,
        fontFamily: fonts.fontPixel,
        fontSize: rem(sizes.small),
        cursor: 'pointer',
        whiteSpace: 'nowrap',
    },
    card: {
        position: 'absolute',
        left: rem(12),
        bottom: rem(12),
        display: 'flex',
        flexDirection: 'column',
        gap: rem(2),
        maxWidth: `min(${rem(320)}, 60%)`,
        padding: [rem(10), rem(14)],
        border: `${rem(3)} solid ${colors.cartridgeExperience}`,
        borderRadius: rem(sizes.radiusSmall),
        backgroundColor: colors.dialogBg,
        color: colors.dialogText,
        boxShadow: `0 ${rem(4)} 0 ${colors.outline}`,
        animation: '$cardIn 0.3s ease-out',
        pointerEvents: 'none',
        [breakpoint(sizes.breakpointSmall)]: {
            maxWidth: '72%',
            padding: [rem(6), rem(10)],
        },
    },
    cardDates: {
        fontFamily: fonts.fontPixel,
        fontSize: rem(sizes.small),
        color: colors.woodDark,
    },
    cardRole: {
        fontFamily: fonts.fontPixel,
        fontSize: rem(sizes.large),
        lineHeight: 1.2,
    },
    cardCompany: {
        fontWeight: sizes.weight700,
        fontSize: rem(sizes.small),
    },
    cardSummary: {
        fontSize: rem(sizes.small),
        [breakpoint(sizes.breakpointSmall)]: {
            display: 'none',
        },
    },
    controls: {
        display: 'none',
        justifyContent: 'space-between',
        marginTop: rem(16),
        userSelect: 'none',
        touchAction: 'none',
        [touchOnly]: {
            display: 'flex',
        },
    },
    control: {
        width: rem(72),
        height: rem(64),
        border: `${rem(3)} solid ${colors.outline}`,
        borderRadius: rem(sizes.radius),
        backgroundColor: colors.dialogBg,
        color: colors.outline,
        fontSize: rem(24),
        boxShadow: `0 ${rem(4)} 0 ${colors.outline}`,
        touchAction: 'none',
        '&:active': {
            transform: `translateY(${rem(2)})`,
            boxShadow: `0 ${rem(2)} 0 ${colors.outline}`,
        },
    },
};

// @ts-ignore
export const useCareerRoadStyles = createUseStyles(styles);
