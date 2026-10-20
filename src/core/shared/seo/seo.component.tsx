import {Helmet} from 'react-helmet-async';
import {useStore} from 'store/store.config';
import {environment} from 'core/configs/app.config';
import useLocalization from 'assets/lang';
import {ISeo} from './seo';

// React 18 → react-helmet-async. Hər public səhifə öz SeoComponent-ini render edir.
const SeoComponent = ({titleKey, descriptionKey, path, image, noIndex, jsonLd}: ISeo) => {
    const translate = useLocalization();
    const lang = useStore('lang');
    const title = `${translate(titleKey)} | ${translate('site_name')}`;
    const description = translate(descriptionKey);
    const url = `${environment.siteUrl}${path}`;
    const ogImage = image?.startsWith('/') ? `${environment.siteUrl}${image}` : image || environment.ogImage;

    return (
        <Helmet>
            <html lang={lang}/>
            <title>{title}</title>
            <meta name='description' content={description}/>
            <link rel='canonical' href={url}/>
            {noIndex ? <meta name='robots' content='noindex, nofollow'/> : null}

            <meta property='og:type' content='website'/>
            <meta property='og:title' content={title}/>
            <meta property='og:description' content={description}/>
            <meta property='og:url' content={url}/>
            {ogImage ? <meta property='og:image' content={ogImage}/> : null}
            <meta name='twitter:card' content='summary_large_image'/>

            {jsonLd ? <script type='application/ld+json'>{JSON.stringify(jsonLd)}</script> : null}
        </Helmet>
    );
};

export default SeoComponent;
