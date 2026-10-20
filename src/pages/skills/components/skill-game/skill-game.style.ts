import {createUseStyles} from 'react-jss';
import colors from 'assets/styles/abstracts/color';
import fonts from 'assets/styles/abstracts/fonts';
import sizes from 'assets/styles/abstracts/sizes';
import {rem} from 'assets/styles/abstracts/functions';
import {breakpoint} from 'assets/styles/abstracts/mixins';

const touchOnly = '@media (hover: none) and (pointer: coarse)';
const fineOnly = '@media (hover: hover) and (pointer: fine)';

const styles = {
    '@keyframes confettiFall': {
        '0%': {top: '-5%', transform: 'rotate(0deg)'},
        '100%': {top: '105%', transform: 'rotate(540deg)'},
    },
    '@keyframes popupIn': {
        '0%': {transform: 'translate(-50%, -8px) scale(0.9)', opacity: 0},
        '100%': {transform: 'translate(-50%, 0) scale(1)', opacity: 1},
    },
    '@keyframes logoFloat': {
        '0%, 100%': {transform: 'translateY(0)'},
        '50%': {transform: `translateY(${rem(-4)})`},
    },
    game: {
        marginBottom: rem(40),
    },
    frame: {
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        border: `${rem(4)} solid ${colors.outline}`,
        borderRadius: rem(sizes.radius),
        boxShadow: `0 0 0 ${rem(3)} ${colors.screenBorder}, 0 ${rem(12)} ${rem(32)} ${colors.black}66`,
        backgroundColor: colors.gameSkyDay,
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
        overflow: 'hidden',
    },
    logo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: fonts.fontPixel,
        fontWeight: sizes.weight700,
        fontSize: rem(52),
        lineHeight: 1,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: colors.gameBlock,
        textShadow: `${rem(3)} ${rem(3)} 0 ${colors.gameFlag}, ${rem(6)} ${rem(6)} 0 ${colors.outline}`,
        animation: '$logoFloat 3s ease-in-out infinite',
        [breakpoint(sizes.breakpoint)]: {
            fontSize: rem(34),
        },
    },
    logoSmall: {
        fontSize: '0.45em',
        color: colors.cartridgeLabel,
        textShadow: `${rem(2)} ${rem(2)} 0 ${colors.outline}`,
    },
    subtitle: {
        color: colors.text,
        fontSize: rem(sizes.large),
        [breakpoint(sizes.breakpointSmall)]: {
            fontSize: rem(sizes.text),
        },
    },
    overlayTitle: {
        fontFamily: fonts.fontPixel,
        fontSize: rem(32),
        color: colors.gameBlock,
        textShadow: `${rem(3)} ${rem(3)} 0 ${colors.outline}`,
        [breakpoint(sizes.breakpointSmall)]: {
            fontSize: rem(22),
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
        gap: rem(10),
        pointerEvents: 'none',
    },
    hudLabel: {
        padding: [rem(4), rem(10)],
        borderRadius: rem(6),
        backgroundColor: `${colors.outline}CC`,
        color: colors.cartridgeLabel,
        fontFamily: fonts.fontPixel,
        fontSize: rem(sizes.small),
    },
    hudButton: {
        marginLeft: 'auto',
        minHeight: rem(32),
        padding: [0, rem(12)],
        border: `${rem(2)} solid ${colors.outline}`,
        borderRadius: rem(6),
        backgroundColor: colors.cartridgeLabel,
        color: colors.outline,
        fontFamily: fonts.fontPixel,
        fontSize: rem(sizes.small),
        cursor: 'pointer',
        pointerEvents: 'auto',
    },
    popup: {
        position: 'absolute',
        top: rem(52),
        left: '50%',
        display: 'flex',
        flexDirection: 'column',
        gap: rem(2),
        width: 'max-content',
        maxWidth: '80%',
        padding: [rem(10), rem(16)],
        border: `${rem(3)} solid`,
        borderRadius: rem(sizes.radiusSmall),
        backgroundColor: colors.dialogBg,
        color: colors.dialogText,
        textAlign: 'center',
        boxShadow: `0 ${rem(4)} 0 ${colors.outline}`,
        animation: '$popupIn 0.25s ease-out forwards',
        pointerEvents: 'none',
        '& strong': {
            fontFamily: fonts.fontPixel,
            fontSize: rem(sizes.large),
        },
        '& span': {
            fontSize: rem(sizes.small),
        },
    },
    map: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: rem(16),
        counterReset: 'none',
    },
    mapItem: {
        display: 'flex',
    },
    mapNode: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: rem(4),
        minWidth: rem(120),
        minHeight: rem(sizes.touch),
        padding: [rem(12), rem(16)],
        border: `${rem(4)} solid`,
        borderRadius: rem(sizes.radiusSmall),
        backgroundColor: colors.dialogBg,
        color: colors.dialogText,
        fontFamily: fonts.fontPixel,
        fontSize: rem(sizes.text),
        cursor: 'pointer',
        boxShadow: `0 ${rem(4)} 0 ${colors.outline}`,
        '&:hover': {
            transform: `translateY(${rem(-2)})`,
        },
        [breakpoint(sizes.breakpointSmall)]: {
            minWidth: rem(96),
            padding: [rem(8), rem(10)],
            fontSize: rem(sizes.small),
        },
    },
    mapNodeDone: {
        backgroundColor: colors.gameBlockLight,
    },
    mapNumber: {
        fontSize: rem(sizes.h3),
        fontWeight: sizes.weight700,
    },
    mapCount: {
        fontSize: rem(sizes.small),
    },
    confetti: {
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        '& span': {
            position: 'absolute',
            top: '-5%',
            width: rem(8),
            height: rem(12),
            animationName: '$confettiFall',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
        },
    },
    controls: {
        display: 'none',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: rem(16),
        userSelect: 'none',
        touchAction: 'none',
        [touchOnly]: {
            display: 'flex',
        },
    },
    controlGroup: {
        display: 'flex',
        gap: rem(12),
    },
    control: {
        width: rem(64),
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
    controlJump: {
        width: rem(80),
        height: rem(80),
        borderRadius: '50%',
        backgroundColor: colors.gameFlag,
        color: colors.white,
    },
};

// @ts-ignore
export const useSkillGameStyles = createUseStyles(styles);
