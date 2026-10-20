import {createUseStyles} from 'react-jss';
import colors from 'assets/styles/abstracts/color';
import fonts from 'assets/styles/abstracts/fonts';
import sizes from 'assets/styles/abstracts/sizes';
import {rem} from 'assets/styles/abstracts/functions';
import {breakpoint, transition} from 'assets/styles/abstracts/mixins';

const linkBase = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: rem(10),
    minHeight: rem(sizes.touch),
    color: colors.text,
    textDecoration: 'none',
    transition: transition('color', 0.2),
    '& svg': {
        fontSize: rem(22),
        color: colors.cartridgeContact,
    },
    '&:hover': {
        color: colors.primary,
    },
};

const styles = {
    layout: {
        display: 'grid',
        gridTemplateColumns: `1fr ${rem(460)}`,
        gap: rem(48),
        alignItems: 'start',
        [breakpoint(sizes.breakpoint)]: {
            gridTemplateColumns: '1fr',
            gap: rem(32),
        },
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        gap: rem(28),
    },
    label: {
        marginBottom: rem(4),
        fontFamily: fonts.fontPixel,
        color: colors.textMuted,
    },
    email: {
        ...linkBase,
        fontSize: rem(sizes.large),
        wordBreak: 'break-all',
    },
    socials: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: [rem(4), rem(24)],
    },
    social: linkBase,
    card: {
        padding: rem(28),
        backgroundColor: colors.screenSurface,
        border: `${rem(1)} solid ${colors.screenBorder}`,
        borderRadius: rem(sizes.radius),
        [breakpoint(sizes.breakpointSmall)]: {
            padding: rem(20),
        },
    },
    cardTitle: {
        marginBottom: rem(20),
        fontSize: rem(sizes.h3),
    },
};

// @ts-ignore
export const useContactStyles = createUseStyles(styles);
