import {createUseStyles} from 'react-jss';
import {rem} from 'assets/styles/abstracts/functions';

const styles = {
    grid: {
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(${rem(300)}, 1fr))`,
        gap: rem(24),
    },
};

// @ts-ignore
export const useProjectsStyles = createUseStyles(styles);
