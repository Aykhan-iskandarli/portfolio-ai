import colors from '../abstracts/color';
import fonts from '../abstracts/fonts';
import sizes from '../abstracts/sizes';
import {rem} from '../abstracts/functions';
import {breakpoint} from '../abstracts/mixins';

const typography = {
    body: {
        fontFamily: fonts.font,
        fontSize: rem(sizes.base),
        lineHeight: sizes.lineHeight,
        color: colors.text,
        backgroundColor: colors.wall,
        WebkitFontSmoothing: 'antialiased',
    },
    'h1, h2, h3': {
        fontFamily: fonts.fontPixel,
        fontWeight: sizes.weight700,
        lineHeight: 1.2,
        letterSpacing: '0.02em',
    },
    h1: {
        fontSize: rem(sizes.h1),
        [breakpoint(sizes.breakpoint)]: {
            fontSize: rem(30),
        },
    },
    h2: {
        fontSize: rem(sizes.h2),
        [breakpoint(sizes.breakpoint)]: {
            fontSize: rem(22),
        },
    },
    h3: {
        fontSize: rem(sizes.h3),
    },
    a: {
        color: colors.primary,
    },
};

export default typography;
