import {createUseStyles} from 'react-jss';
import {rem} from 'assets/styles/abstracts/functions';

const styles = {
    loader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: rem(240),
    },
};

// @ts-ignore
export const useLoaderStyles = createUseStyles(styles);
