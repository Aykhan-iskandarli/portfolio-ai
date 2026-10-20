import {Button} from 'antd';
import {Routes} from 'router/routes';
import {profile} from 'core/configs/content.config';
import SeoComponent from 'core/shared/seo/seo.component';
import PageHeaderComponent from 'core/shared/page-header/page-header.component';
import useLocalization from 'assets/lang';
import colors from 'assets/styles/abstracts/color';
import {DownloadIcon} from 'assets/images/icons/icons';
import {useAboutStyles} from './about.style';

const whatIDoKeys = ['about_what_1', 'about_what_2', 'about_what_3'];

function AboutComponent() {
    const translate = useLocalization();
    const {layout, photo, bio, subtitle, list, item} = useAboutStyles();

    return (
        <>
            <SeoComponent titleKey='about_title' descriptionKey='about_description' path={Routes.about}/>
            <PageHeaderComponent title={translate('about_title')} color={colors.cartridgeAbout}/>

            <div className={layout}>
                <img
                    className={photo}
                    src={profile.photo}
                    alt={translate('about_photo_alt')}
                    width={320}
                    height={320}
                    loading='lazy'
                    decoding='async'
                />
                <div>
                    <p className={bio}>{translate('about_bio')}</p>

                    <h2 className={subtitle}>{translate('about_what_title')}</h2>
                    <ul className={list}>
                        {whatIDoKeys.map((key) => (
                            <li key={key} className={item}>{translate(key)}</li>
                        ))}
                    </ul>

                    {profile.cvUrl ? (
                        <Button type='primary' size='large' href={profile.cvUrl} download icon={<DownloadIcon/>}>
                            {translate('about_cv')}
                        </Button>
                    ) : null}
                </div>
            </div>
        </>
    );
}

export default AboutComponent;
