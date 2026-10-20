import {createUseStyles} from 'react-jss';
import colors from 'assets/styles/abstracts/color';
import fonts from 'assets/styles/abstracts/fonts';
import sizes from 'assets/styles/abstracts/sizes';
import {rem} from 'assets/styles/abstracts/functions';
import {transition} from 'assets/styles/abstracts/mixins';

const styles = {
    // Bütün kart kliklənir: başlıqdakı link ::after ilə kartı örtür (link içində blok elementlər olmur)
    card: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: colors.screenSurface,
        border: `${rem(1)} solid ${colors.screenBorder}`,
        borderRadius: rem(sizes.radius),
        transition: `${transition('transform', 0.2)}, ${transition('border-color', 0.2)}`,
        '&:hover': {
            transform: `translateY(${rem(-4)})`,
            borderColor: colors.primary,
        },
        '&:focus-within': {
            borderColor: colors.focus,
            boxShadow: `0 0 0 ${rem(3)} ${colors.focus}`,
        },
    },
    image: {
        width: '100%',
        height: 'auto',
        aspectRatio: '16 / 10',
        objectFit: 'cover',
        backgroundColor: colors.screenBorder,
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        gap: rem(12),
        flex: 1,
        padding: rem(20),
    },
    title: {
        fontSize: rem(sizes.h3),
        '& a': {
            color: colors.text,
            textDecoration: 'none',
            '&::after': {
                content: '""',
                position: 'absolute',
                inset: 0,
            },
            '&:focus-visible': {
                outline: 'none',
            },
        },
    },
    summary: {
        color: colors.textMuted,
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
        color: colors.text,
    },
    more: {
        marginTop: 'auto',
        fontFamily: fonts.fontPixel,
        color: colors.primary,
    },
};

// @ts-ignore
export const useProjectCardStyles = createUseStyles(styles);
