import {createUseStyles} from 'react-jss';
import colors from 'assets/styles/abstracts/color';
import fonts from 'assets/styles/abstracts/fonts';
import sizes from 'assets/styles/abstracts/sizes';
import {rem} from 'assets/styles/abstracts/functions';

const styles = {
    timeline: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: rem(36),
        maxWidth: rem(720),
        paddingLeft: rem(36),
        '&::before': {
            content: '""',
            position: 'absolute',
            left: rem(7),
            top: rem(6),
            bottom: rem(6),
            width: rem(2),
            backgroundColor: colors.screenBorder,
        },
    },
    entry: {
        position: 'relative',
    },
    dot: {
        position: 'absolute',
        left: rem(-36),
        top: rem(4),
        width: rem(16),
        height: rem(16),
        backgroundColor: colors.cartridgeExperience,
        border: `${rem(3)} solid ${colors.screenBg}`,
        boxShadow: `0 0 0 ${rem(2)} ${colors.cartridgeExperience}`,
    },
    dates: {
        marginBottom: rem(6),
        fontFamily: fonts.fontPixel,
        color: colors.cartridgeExperience,
    },
    role: {
        fontSize: rem(sizes.h3),
    },
    company: {
        marginBottom: rem(8),
        color: colors.text,
        fontWeight: sizes.weight600,
    },
    summary: {
        color: colors.textMuted,
    },
};

// @ts-ignore
export const useExperienceStyles = createUseStyles(styles);
