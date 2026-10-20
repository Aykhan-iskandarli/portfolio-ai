import {Routes} from 'router/routes';
import SeoComponent from 'core/shared/seo/seo.component';
import LoaderComponent from 'core/shared/loader/loader.component';
import PageHeaderComponent from 'core/shared/page-header/page-header.component';
import useLocalization from 'assets/lang';
import colors from 'assets/styles/abstracts/color';
import {useGetExperience} from './actions/experience.query';
import {useExperienceStyles} from './experience.style';

function ExperienceComponent() {
    const translate = useLocalization();
    const {timeline, entry, dot, dates, role, company, summary} = useExperienceStyles();
    const {data: jobs, isLoading} = useGetExperience();

    return (
        <>
            <SeoComponent titleKey='experience_title' descriptionKey='experience_description' path={Routes.experience}/>
            <PageHeaderComponent title={translate('experience_title')} color={colors.cartridgeExperience}/>

            {isLoading ? <LoaderComponent/> : (
                <ol className={timeline}>
                    {(jobs ?? []).map((job) => (
                        <li key={job.key} className={entry}>
                            <span className={dot} aria-hidden='true'/>
                            <p className={dates}>
                                {job.start} — {job.end ?? translate('experience_present')}
                            </p>
                            <h2 className={role}>{translate(`experience_${job.key}_role`)}</h2>
                            <p className={company}>{job.company}</p>
                            <p className={summary}>{translate(`experience_${job.key}_summary`)}</p>
                        </li>
                    ))}
                </ol>
            )}
        </>
    );
}

export default ExperienceComponent;
