import {createUseStyles} from 'react-jss';
import reset from './reset/reset';
import typography from './base/typography';
import commonStyles from './base/common';

const useGlobalStyles = createUseStyles({
    '@global': {
        ...reset,
        ...typography,
        ...commonStyles,
    },
});

export default useGlobalStyles;
