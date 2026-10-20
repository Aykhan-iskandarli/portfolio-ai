import {Link} from 'react-router-dom';
import {goTo, Routes} from 'router/routes';
import useLocalization from 'assets/lang';
import {useProjectCardStyles} from './project-card.style';
import {IProjectCard} from './project-card';

function ProjectCardComponent({project}: IProjectCard) {
    const translate = useLocalization();
    const {card, image, body, title, summary, tags, tag, more} = useProjectCardStyles();
    const projectTitle = translate(`project_${project.key}_title`);

    return (
        <article className={card}>
            {project.image ? (
                <img
                    className={image}
                    src={project.image}
                    alt={translate('project_image_alt', {title: projectTitle})}
                    width={640}
                    height={400}
                    loading='lazy'
                    decoding='async'
                />
            ) : null}
            <div className={body}>
                <h2 className={title}>
                    <Link to={goTo(Routes.projects, project.slug ?? '')}>{projectTitle}</Link>
                </h2>
                <p className={summary}>{translate(`project_${project.key}_summary`)}</p>
                <ul className={tags} aria-label={translate('project_stack')}>
                    {project.tech.map((item) => (
                        <li key={item} className={tag}>{item}</li>
                    ))}
                </ul>
                <span className={more} aria-hidden='true'>{translate('project_view')} →</span>
            </div>
        </article>
    );
}

export default ProjectCardComponent;
