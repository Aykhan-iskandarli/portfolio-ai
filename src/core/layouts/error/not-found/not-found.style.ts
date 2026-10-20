import {createUseStyles} from 'react-jss';
import colors from 'assets/styles/abstracts/color';
import fonts from 'assets/styles/abstracts/fonts';
import sizes from 'assets/styles/abstracts/sizes';
import {rem} from 'assets/styles/abstracts/functions';

const styles = {
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: rem(20),
        padding: [rem(48), 0],
        textAlign: 'center',
    },
    code: {
        fontFamily: fonts.fontPixel,
        fontSize: rem(96),
        lineHeight: 1,
        color: colors.primary,
    },
    text: {
        maxWidth: rem(480),
        color: colors.textMuted,
        fontSize: rem(sizes.large),
    },
};

// @ts-ignore
export const useNotFoundStyles = createUseStyles(styles);
