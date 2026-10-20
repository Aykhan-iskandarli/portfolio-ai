import colors from '../abstracts/color';
import {rem} from '../abstracts/functions';
import {reducedMotion} from '../abstracts/mixins';

const common = {
    ':focus-visible': {
        outline: `${rem(3)} solid ${colors.focus}`,
        outlineOffset: rem(3),
    },
    '.sr-only': {
        position: 'absolute',
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0,
    },
    [reducedMotion]: {
        '*, *::before, *::after': {
            animationDuration: '0.01ms !important',
            animationIterationCount: '1 !important',
            transitionDuration: '0.01ms !important',
        },
    },
};

export default common;
