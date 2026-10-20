import {projects} from 'core/configs/content.config';
import ProjectModel from '../models/project.model';

// Backend hələ yoxdur: data content.config.ts-dən gəlir. API hazır olanda yalnız bu fayl dəyişir.
export const getProjects = (): Promise<ProjectModel[]> => {
    return Promise.resolve(projects)
        .then((res) => {
            return res.map((item) => new ProjectModel(item));
        });
};
