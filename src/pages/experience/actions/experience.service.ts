import {experience} from 'core/configs/content.config';
import ExperienceModel from '../models/experience.model';

export const getExperience = (): Promise<ExperienceModel[]> => {
    return Promise.resolve(experience)
        .then((res) => {
            return res.map((item) => new ExperienceModel(item));
        });
};
