import {useCallback, useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useReducedMotion} from 'framer-motion';
import classNames from 'classnames';
import {Routes} from 'router/routes';
import SeoComponent from 'core/shared/seo/seo.component';
import LoaderComponent from 'core/shared/loader/loader.component';
import PageHeaderComponent from 'core/shared/page-header/page-header.component';
import useLocalization from 'assets/lang';
import colors from 'assets/styles/abstracts/color';
import {useGetExperience} from './actions/experience.query';
import CareerRoadComponent from './components/career-road/career-road.component';
import {useExperienceStyles} from './experience.style';

function ExperienceComponent() {
    const translate = useLocalization();
    const navigate = useNavigate();
    const reduceMotion = useReducedMotion();
    const {timeline, entry, active, dot, dates, role, company, summary} = useExperienceStyles();
    const {data: jobs, isLoading} = useGetExperience();
    const [activeKey, setActiveKey] = useState<string | null>(null);

    // Yol keçmişdən bu günə gedir, timeline isə ən yeni iş birinci göstərilir
    const chronological = useMemo(() => [...(jobs ?? [])].reverse(), [jobs]);

    const handleCheckpoint = useCallback((jobKey: string | null) => {
        setActiveKey(jobKey);
    }, []);

    const handleContact = useCallback(() => {
        navigate(Routes.contact);
    }, [navigate]);

    return (
        <>
            <SeoComponent titleKey='experience_title' descriptionKey='experience_description' path={Routes.experience}/>
            <PageHeaderComponent title={translate('experience_title')} color={colors.cartridgeExperience}/>

            {isLoading ? <LoaderComponent/> : (
                <>
                    {!reduceMotion && chronological.length ? (
                        <CareerRoadComponent jobs={chronological} onCheckpoint={handleCheckpoint} onContact={handleContact}/>
                    ) : null}

                    <ol className={timeline}>
                        {(jobs ?? []).map((job) => (
                            <li key={job.key} className={classNames(entry, {[active]: job.key === activeKey})}>
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
                </>
            )}
        </>
    );
}

export default ExperienceComponent;
