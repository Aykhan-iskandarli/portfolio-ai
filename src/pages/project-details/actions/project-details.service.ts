import {projects} from 'core/configs/content.config';
import ProjectModel from 'pages/projects/models/project.model';

export const getProjectBySlug = (slug: string): Promise<ProjectModel | null> => {
    return Promise.resolve(projects.find((item) => item.slug === slug))
        .then((res) => {
            return res ? new ProjectModel(res) : null;
        });
};
