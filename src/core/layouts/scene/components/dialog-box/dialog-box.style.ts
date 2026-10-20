import {createUseStyles} from 'react-jss';
import colors from 'assets/styles/abstracts/color';
import fonts from 'assets/styles/abstracts/fonts';
import sizes from 'assets/styles/abstracts/sizes';
import {rem} from 'assets/styles/abstracts/functions';
import {breakpoint} from 'assets/styles/abstracts/mixins';

const styles = {
    '@keyframes caretBlink': {
        '0%, 100%': {opacity: 1},
        '50%': {opacity: 0},
    },
    dialog: {
        display: 'flex',
        alignItems: 'center',
        gap: rem(16),
        width: '100%',
        maxWidth: rem(600),
        minHeight: rem(96),
        padding: [rem(12), rem(20), rem(12), rem(12)],
        backgroundColor: colors.dialogBg,
        border: `${rem(4)} solid ${colors.dialogBorder}`,
        borderRadius: rem(sizes.radius),
        boxShadow: `0 0 0 ${rem(3)} ${colors.dialogBg}, 0 0 0 ${rem(6)} ${colors.outline}, 0 ${rem(10)} ${rem(24)} ${colors.outline}55`,
        [breakpoint(sizes.breakpointSmall)]: {
            minHeight: rem(80),
            gap: rem(12),
        },
    },
    avatar: {
        flexShrink: 0,
        width: rem(64),
        height: rem(64),
        border: `${rem(3)} solid ${colors.outline}`,
        borderRadius: rem(6),
        overflow: 'hidden',
        backgroundColor: colors.wall,
        [breakpoint(sizes.breakpointSmall)]: {
            width: rem(48),
            height: rem(48),
        },
    },
    message: {
        position: 'relative',
        flex: 1,
        minHeight: '2.8em',
        paddingRight: rem(20),
        fontFamily: fonts.fontPixel,
        fontSize: rem(19),
        lineHeight: 1.4,
        color: colors.dialogText,
        [breakpoint(sizes.breakpointSmall)]: {
            fontSize: rem(15),
        },
    },
    caret: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        fontSize: rem(12),
        animation: '$caretBlink 1s steps(1) infinite',
    },
};

// @ts-ignore
export const useDialogBoxStyles = createUseStyles(styles);
