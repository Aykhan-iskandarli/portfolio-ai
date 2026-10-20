import {skillGroups} from 'core/configs/content.config';
import SkillGroupModel from '../models/skill-group.model';

export const getSkillGroups = (): Promise<SkillGroupModel[]> => {
    return Promise.resolve(skillGroups)
        .then((res) => {
            return res.map((item) => new SkillGroupModel(item));
        });
};
