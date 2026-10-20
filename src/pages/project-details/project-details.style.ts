import {createUseStyles} from 'react-jss';
import colors from 'assets/styles/abstracts/color';
import fonts from 'assets/styles/abstracts/fonts';
import sizes from 'assets/styles/abstracts/sizes';
import {rem} from 'assets/styles/abstracts/functions';
import {breakpoint} from 'assets/styles/abstracts/mixins';

const styles = {
    back: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: rem(8),
        minHeight: rem(sizes.touch),
        marginBottom: rem(24),
        color: colors.textMuted,
        fontFamily: fonts.fontPixel,
        textDecoration: 'none',
        '&:hover': {
            color: colors.text,
        },
    },
    hero: {
        display: 'flex',
        flexDirection: 'column',
        gap: rem(16),
        marginBottom: rem(32),
    },
    summary: {
        maxWidth: rem(640),
        color: colors.textMuted,
        fontSize: rem(sizes.large),
    },
    actions: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: rem(12),
    },
    gallery: {
        display: 'grid',
        gap: rem(16),
        marginBottom: rem(40),
    },
    shot: {
        width: '100%',
        height: 'auto',
        aspectRatio: '16 / 10',
        objectFit: 'cover',
        borderRadius: rem(sizes.radius),
        border: `${rem(1)} solid ${colors.screenBorder}`,
        backgroundColor: colors.screenSurface,
    },
    facts: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: rem(20),
        margin: 0,
        [breakpoint(sizes.breakpoint)]: {
            gridTemplateColumns: '1fr',
        },
    },
    fact: {
        padding: rem(20),
        backgroundColor: colors.screenSurface,
        border: `${rem(1)} solid ${colors.screenBorder}`,
        borderRadius: rem(sizes.radius),
        '& dt': {
            marginBottom: rem(8),
            fontFamily: fonts.fontPixel,
            fontSize: rem(sizes.large),
            color: colors.primary,
        },
        '& dd': {
            margin: 0,
            color: colors.text,
        },
    },
    tags: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: rem(8),
    },
    tag: {
        padding: [rem(2), rem(10)],
        borderRadius: rem(999),
        backgroundColor: colors.screenBg,
        border: `${rem(1)} solid ${colors.screenBorder}`,
        fontSize: rem(sizes.small),
    },
    missing: {
        color: colors.textMuted,
        fontSize: rem(sizes.large),
    },
};

// @ts-ignore
export const useProjectDetailsStyles = createUseStyles(styles);
