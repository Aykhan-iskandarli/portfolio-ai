import {createUseStyles} from 'react-jss';

const styles = {
    room: {
        position: 'absolute',
        left: -400,
        top: -200,
        display: 'block',
        overflow: 'visible',
        pointerEvents: 'none',
    },
};

// @ts-ignore
export const useRoomStyles = createUseStyles(styles);
