import {Button} from 'antd';
import {Link, useParams} from 'react-router-dom';
import {goTo, Routes} from 'router/routes';
import SeoComponent from 'core/shared/seo/seo.component';
import LoaderComponent from 'core/shared/loader/loader.component';
import useLocalization from 'assets/lang';
import {ArrowLeftIcon, ExternalIcon, GithubIcon} from 'assets/images/icons/icons';
import {useGetProjectBySlug} from './actions/project-details.query';
import {useProjectDetailsStyles} from './project-details.style';

function ProjectDetailsComponent() {
    const translate = useLocalization();
    const {slug} = useParams();
    const {data: project, isLoading} = useGetProjectBySlug(slug ?? null);
    const {back, hero, summary, actions, gallery, shot, facts, fact, tags, tag, missing} = useProjectDetailsStyles();

    if (isLoading) {
        return <LoaderComponent/>;
    }

    const backLink = (
        <Link className={back} to={Routes.projects}>
            <ArrowLeftIcon/>
            <span>{translate('project_back')}</span>
        </Link>
    );

    if (!project) {
        return (
            <>
                <SeoComponent titleKey='not_found_title' descriptionKey='not_found_description' path={goTo(Routes.projects, slug ?? '')} noIndex/>
                {backLink}
                <p className={missing}>{translate('project_not_found')}</p>
            </>
        );
    }

    const titleKey = `project_${project.key}_title`;
    const title = translate(titleKey);

    return (
        <article>
            <SeoComponent
                titleKey={titleKey}
                descriptionKey={`project_${project.key}_problem`}
                path={goTo(Routes.projects, project.slug ?? '')}
                image={project.image ?? undefined}
            />
            {backLink}

            <header className={hero}>
                <h1>{title}</h1>
                <p className={summary}>{translate(`project_${project.key}_summary`)}</p>
                <div className={actions}>
                    {project.liveUrl ? (
                        <Button type='primary' size='large' href={project.liveUrl} target='_blank' rel='noopener noreferrer' icon={<ExternalIcon/>}>
                            {translate('project_live')}
                        </Button>
                    ) : null}
                    {project.githubUrl ? (
                        <Button size='large' href={project.githubUrl} target='_blank' rel='noopener noreferrer' icon={<GithubIcon/>}>
                            {translate('project_github')}
                        </Button>
                    ) : null}
                </div>
            </header>

            {project.screenshots.length ? (
                <div className={gallery}>
                    {project.screenshots.map((src, index) => (
                        <img
                            key={src}
                            className={shot}
                            src={src}
                            alt={translate('project_screenshot_alt', {title, index: index + 1})}
                            width={640}
                            height={400}
                            loading={index === 0 ? 'eager' : 'lazy'}
                            decoding='async'
                        />
                    ))}
                </div>
            ) : null}

            <dl className={facts}>
                <div className={fact}>
                    <dt>{translate('project_problem')}</dt>
                    <dd>{translate(`project_${project.key}_problem`)}</dd>
                </div>
                <div className={fact}>
                    <dt>{translate('project_role')}</dt>
                    <dd>{translate(`project_${project.key}_role`)}</dd>
                </div>
                <div className={fact}>
                    <dt>{translate('project_stack')}</dt>
                    <dd>
                        <ul className={tags}>
                            {project.tech.map((item) => (
                                <li key={item} className={tag}>{item}</li>
                            ))}
                        </ul>
                    </dd>
                </div>
                <div className={fact}>
                    <dt>{translate('project_result')}</dt>
                    <dd>{translate(`project_${project.key}_result`)}</dd>
                </div>
            </dl>
        </article>
    );
}

export default ProjectDetailsComponent;
