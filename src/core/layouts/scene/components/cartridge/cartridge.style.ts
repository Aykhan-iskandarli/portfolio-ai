import {createUseStyles} from 'react-jss';
import colors from 'assets/styles/abstracts/color';
import fonts from 'assets/styles/abstracts/fonts';
import {transition} from 'assets/styles/abstracts/mixins';

const styles = {
    wrapper: {
        position: 'absolute',
        left: 0,
        top: 0,
        pointerEvents: 'none',
    },
    bob: {
        width: '100%',
        height: '100%',
    },
    button: {
        position: 'relative',
        display: 'block',
        width: '100%',
        height: '100%',
        padding: 0,
        border: 0,
        background: 'none',
        cursor: 'pointer',
        pointerEvents: 'auto',
        borderRadius: 12,
        filter: `drop-shadow(0 8px 0 ${colors.outline}33)`,
        transition: transition('filter', 0.2),
        '&:hover, &:focus-visible': {
            filter: 'drop-shadow(0 0 14px var(--glow)) drop-shadow(0 0 4px var(--glow))',
        },
        '&:focus-visible': {
            outline: `4px solid ${colors.focus}`,
            outlineOffset: 6,
        },
        '&:disabled': {
            cursor: 'default',
        },
        '&:hover $tooltip, &:focus-visible $tooltip': {
            opacity: 1,
            transform: 'translate(-50%, 0)',
        },
    },
    tooltip: {
        position: 'absolute',
        left: '50%',
        bottom: '100%',
        marginBottom: 14,
        padding: [6, 12],
        borderRadius: 8,
        backgroundColor: colors.outline,
        color: colors.cartridgeLabel,
        fontFamily: fonts.fontPixel,
        fontSize: 18,
        whiteSpace: 'nowrap',
        opacity: 0,
        transform: 'translate(-50%, 6px)',
        transition: `${transition('opacity', 0.18)}, ${transition('transform', 0.18)}`,
        pointerEvents: 'none',
    },
};

// @ts-ignore
export const useCartridgeStyles = createUseStyles(styles);
