import {createUseStyles} from 'react-jss';
import colors from 'assets/styles/abstracts/color';
import {rem} from 'assets/styles/abstracts/functions';
import {breakpoint} from 'assets/styles/abstracts/mixins';
import sizes from 'assets/styles/abstracts/sizes';

const styles = {
    scene: {
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        backgroundColor: colors.wall,
        backgroundImage: `linear-gradient(180deg, ${colors.wall} 0%, ${colors.wall} 55%, ${colors.floor} 55%, ${colors.floorDark} 100%)`,
        touchAction: 'manipulation',
    },
    stage: {
        position: 'absolute',
        left: 0,
        top: 0,
        transformOrigin: '0 0',
    },
    // Qatlar bütün səhnəni örtür — klikləri yalnız içindəki düymələr (kasetlər) qəbul edir
    layer: {
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
    },
    dialogArea: {
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: rem(20),
        zIndex: 20,
        display: 'flex',
        justifyContent: 'center',
        padding: [0, rem(16)],
        pointerEvents: 'none',
        '& > *': {
            pointerEvents: 'auto',
        },
        [breakpoint(sizes.breakpointSmall)]: {
            bottom: rem(12),
        },
    },
};

// @ts-ignore
export const useSceneStyles = createUseStyles(styles);
