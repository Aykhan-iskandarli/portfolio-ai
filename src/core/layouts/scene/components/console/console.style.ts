import {createUseStyles} from 'react-jss';

const styles = {
    console: {
        position: 'absolute',
        display: 'block',
        overflow: 'visible',
        pointerEvents: 'none',
    },
};

// @ts-ignore
export const useConsoleStyles = createUseStyles(styles);
