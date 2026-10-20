import {createUseStyles} from 'react-jss';
import colors from 'assets/styles/abstracts/color';
import fonts from 'assets/styles/abstracts/fonts';
import sizes from 'assets/styles/abstracts/sizes';
import {rem} from 'assets/styles/abstracts/functions';
import {transition} from 'assets/styles/abstracts/mixins';

const styles = {
    panel: {
        display: 'flex',
        flexDirection: 'column',
        gap: rem(32),
        outline: 'none',
    },
    group: {},
    heading: {
        display: 'flex',
        alignItems: 'center',
        gap: rem(12),
        marginBottom: rem(16),
        fontSize: rem(sizes.h3),
    },
    icon: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: rem(40),
        height: rem(40),
        borderRadius: rem(sizes.radiusSmall),
        backgroundColor: colors.screenSurface,
        color: colors.cartridgeSkills,
        fontSize: rem(22),
    },
    count: {
        marginLeft: 'auto',
        fontFamily: fonts.fontPixel,
        fontSize: rem(sizes.text),
        color: colors.textMuted,
    },
    list: {
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(${rem(220)}, 1fr))`,
        gap: rem(12),
    },
    card: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: rem(4),
        padding: [rem(14), rem(16)],
        backgroundColor: colors.screenSurface,
        border: `${rem(1)} solid ${colors.screenBorder}`,
        borderRadius: rem(sizes.radiusSmall),
        overflow: 'hidden',
        transition: transition('border-color', 0.3),
    },
    locked: {
        borderStyle: 'dashed',
        '& $name, & $description': {
            filter: `blur(${rem(5)})`,
            userSelect: 'none',
        },
    },
    lock: {
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: fonts.fontPixel,
        fontSize: rem(28),
        color: colors.gameBlock,
        textShadow: `${rem(2)} ${rem(2)} 0 ${colors.outline}`,
    },
    name: {
        fontFamily: fonts.fontPixel,
        fontSize: rem(sizes.large),
        color: colors.text,
    },
    description: {
        fontSize: rem(sizes.small),
        color: colors.textMuted,
    },
};

// @ts-ignore
export const useSkillPanelStyles = createUseStyles(styles);
