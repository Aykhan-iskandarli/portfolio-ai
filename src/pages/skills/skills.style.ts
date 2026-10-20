import {createUseStyles} from 'react-jss';
import colors from 'assets/styles/abstracts/color';
import sizes from 'assets/styles/abstracts/sizes';
import {rem} from 'assets/styles/abstracts/functions';

const styles = {
    grid: {
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(${rem(280)}, 1fr))`,
        gap: rem(24),
    },
    group: {
        padding: rem(24),
        backgroundColor: colors.screenSurface,
        border: `${rem(1)} solid ${colors.screenBorder}`,
        borderRadius: rem(sizes.radius),
    },
    heading: {
        display: 'flex',
        alignItems: 'center',
        gap: rem(12),
        marginBottom: rem(20),
        fontSize: rem(sizes.h3),
    },
    icon: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: rem(40),
        height: rem(40),
        borderRadius: rem(sizes.radiusSmall),
        backgroundColor: colors.screenBg,
        color: colors.cartridgeSkills,
        fontSize: rem(22),
    },
    list: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: rem(10),
    },
    item: {
        padding: [rem(6), rem(14)],
        borderRadius: rem(sizes.radiusSmall),
        backgroundColor: colors.screenBg,
        border: `${rem(1)} solid ${colors.screenBorder}`,
    },
};

// @ts-ignore
export const useSkillsStyles = createUseStyles(styles);
