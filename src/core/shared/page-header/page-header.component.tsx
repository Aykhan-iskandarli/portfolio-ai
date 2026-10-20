import {usePageHeaderStyles} from './page-header.style';
import {IPageHeader} from './page-header';

function PageHeaderComponent({title, intro, color}: IPageHeader) {
    const {header, accent, text} = usePageHeaderStyles();

    return (
        <header className={header}>
            <span className={accent} style={{backgroundColor: color}} aria-hidden='true'/>
            <h1>{title}</h1>
            {intro ? <p className={text}>{intro}</p> : null}
        </header>
    );
}

export default PageHeaderComponent;
