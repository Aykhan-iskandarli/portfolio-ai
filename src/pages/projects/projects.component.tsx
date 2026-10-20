import {Routes} from 'router/routes';
import SeoComponent from 'core/shared/seo/seo.component';
import LoaderComponent from 'core/shared/loader/loader.component';
import PageHeaderComponent from 'core/shared/page-header/page-header.component';
import useLocalization from 'assets/lang';
import colors from 'assets/styles/abstracts/color';
import {useGetProjects} from './actions/projects.query';
import ProjectCardComponent from './components/project-card/project-card.component';
import {useProjectsStyles} from './projects.style';

function ProjectsComponent() {
    const translate = useLocalization();
    const {grid} = useProjectsStyles();
    const {data: projects, isLoading} = useGetProjects();

    return (
        <>
            <SeoComponent titleKey='projects_title' descriptionKey='projects_description' path={Routes.projects}/>
            <PageHeaderComponent
                title={translate('projects_title')}
                intro={translate('projects_intro')}
                color={colors.cartridgeProjects}
            />
            {isLoading ? <LoaderComponent/> : (
                <ul className={grid}>
                    {(projects ?? []).map((project) => (
                        <li key={project.slug}>
                            <ProjectCardComponent project={project}/>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}

export default ProjectsComponent;
