import {createUseStyles} from 'react-jss';
import colors from 'assets/styles/abstracts/color';
import fonts from 'assets/styles/abstracts/fonts';
import sizes from 'assets/styles/abstracts/sizes';
import {rem} from 'assets/styles/abstracts/functions';

const styles = {
    toolbar: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: rem(12),
        marginBottom: rem(16),
    },
    progress: {
        fontFamily: fonts.fontPixel,
        fontSize: rem(sizes.large),
        color: colors.cartridgeSkills,
    },
    actions: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: rem(10),
    },
};

// @ts-ignore
export const useSkillsStyles = createUseStyles(styles);
