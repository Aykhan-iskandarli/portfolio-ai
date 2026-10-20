import {createUseStyles} from 'react-jss';
import colors from 'assets/styles/abstracts/color';
import sizes from 'assets/styles/abstracts/sizes';
import {rem} from 'assets/styles/abstracts/functions';
import {breakpoint} from 'assets/styles/abstracts/mixins';

const styles = {
    layout: {
        display: 'grid',
        gridTemplateColumns: `${rem(320)} 1fr`,
        gap: rem(48),
        alignItems: 'start',
        [breakpoint(sizes.breakpoint)]: {
            gridTemplateColumns: '1fr',
            gap: rem(28),
        },
    },
    photo: {
        width: '100%',
        maxWidth: rem(320),
        height: 'auto',
        aspectRatio: '1 / 1',
        objectFit: 'cover',
        borderRadius: rem(sizes.radius),
        border: `${rem(4)} solid ${colors.cartridgeAbout}`,
        backgroundColor: colors.screenSurface,
    },
    bio: {
        marginBottom: rem(32),
        fontSize: rem(sizes.large),
        lineHeight: 1.7,
    },
    subtitle: {
        marginBottom: rem(16),
        fontSize: rem(sizes.h3),
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: rem(12),
        marginBottom: rem(32),
    },
    item: {
        position: 'relative',
        paddingLeft: rem(24),
        color: colors.textMuted,
        '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: '0.6em',
            width: rem(10),
            height: rem(10),
            backgroundColor: colors.cartridgeAbout,
        },
    },
};

// @ts-ignore
export const useAboutStyles = createUseStyles(styles);
