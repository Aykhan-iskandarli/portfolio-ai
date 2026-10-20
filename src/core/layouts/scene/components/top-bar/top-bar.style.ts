import {createUseStyles} from 'react-jss';
import colors from 'assets/styles/abstracts/color';
import fonts from 'assets/styles/abstracts/fonts';
import sizes from 'assets/styles/abstracts/sizes';
import {rem} from 'assets/styles/abstracts/functions';
import {breakpoint, transition} from 'assets/styles/abstracts/mixins';

const pillBase = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: rem(8),
    minHeight: rem(sizes.touch),
    padding: [0, rem(16)],
    border: `${rem(3)} solid ${colors.outline}`,
    borderRadius: rem(sizes.radius),
    backgroundColor: colors.dialogBg,
    color: colors.dialogText,
    fontFamily: fonts.fontPixel,
    fontSize: rem(16),
    cursor: 'pointer',
    boxShadow: `0 ${rem(4)} 0 ${colors.outline}`,
    transition: transition('transform', 0.15),
    '& svg': {
        fontSize: rem(20),
    },
    '&:hover': {
        transform: `translateY(${rem(-2)})`,
    },
    '&:active': {
        transform: `translateY(${rem(2)})`,
        boxShadow: `0 ${rem(2)} 0 ${colors.outline}`,
    },
};

const styles = {
    bar: {
        position: 'fixed',
        top: rem(16),
        left: rem(16),
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        gap: rem(10),
        [breakpoint(sizes.breakpointSmall)]: {
            top: rem(12),
            left: rem(12),
            gap: rem(8),
        },
    },
    pill: {
        ...pillBase,
        [breakpoint(sizes.breakpointSmall)]: {
            padding: [0, rem(12)],
            '& span': {
                display: 'none',
            },
        },
    },
    iconPill: {
        width: rem(sizes.touch),
        padding: 0,
    },
    languageGroup: {
        display: 'inline-flex',
        border: `${rem(3)} solid ${colors.outline}`,
        borderRadius: rem(sizes.radius),
        overflow: 'hidden',
        boxShadow: `0 ${rem(4)} 0 ${colors.outline}`,
    },
    languageButton: {
        minWidth: rem(sizes.touch),
        minHeight: rem(38),
        padding: [0, rem(8)],
        border: 0,
        backgroundColor: colors.dialogBg,
        color: colors.dialogText,
        fontFamily: fonts.fontPixel,
        fontSize: rem(15),
        cursor: 'pointer',
        '& + &': {
            borderLeft: `${rem(2)} solid ${colors.outline}`,
        },
    },
    active: {
        backgroundColor: colors.dialogBorder,
        color: colors.white,
    },
};

// @ts-ignore
export const useTopBarStyles = createUseStyles(styles);
