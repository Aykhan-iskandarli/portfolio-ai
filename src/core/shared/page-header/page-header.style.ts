import {createUseStyles} from 'react-jss';
import colors from 'assets/styles/abstracts/color';
import sizes from 'assets/styles/abstracts/sizes';
import {rem} from 'assets/styles/abstracts/functions';

const styles = {
    header: {
        display: 'flex',
        flexDirection: 'column',
        gap: rem(14),
        marginBottom: rem(40),
    },
    accent: {
        display: 'block',
        width: rem(56),
        height: rem(8),
        borderRadius: rem(4),
    },
    text: {
        maxWidth: rem(640),
        color: colors.textMuted,
        fontSize: rem(sizes.large),
    },
};

// @ts-ignore
export const usePageHeaderStyles = createUseStyles(styles);
