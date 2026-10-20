import {useCallback} from 'react';
import {Button} from 'antd';
import {useLocation, useNavigate} from 'react-router-dom';
import {Routes} from 'router/routes';
import SeoComponent from 'core/shared/seo/seo.component';
import useLocalization from 'assets/lang';
import {useNotFoundStyles} from './not-found.style';

// Hosting-də SPA fallback adətən 200 qaytarır — real 404 status deploy konfiqində ayrıca qurulmalıdır
function NotFoundComponent() {
    const translate = useLocalization();
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const {wrapper, code, text} = useNotFoundStyles();

    const handleHome = useCallback(() => {
        navigate(Routes.home);
    }, [navigate]);

    return (
        <section className={wrapper}>
            <SeoComponent titleKey='not_found_title' descriptionKey='not_found_description' path={pathname} noIndex/>
            <p className={code} aria-hidden='true'>404</p>
            <h1>{translate('not_found_title')}</h1>
            <p className={text}>{translate('not_found_text')}</p>
            <Button type='primary' size='large' onClick={handleHome}>{translate('not_found_cta')}</Button>
        </section>
    );
}

export default NotFoundComponent;
