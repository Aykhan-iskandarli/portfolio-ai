import SkillGroupModel from '../../models/skill-group.model';

export interface ISkillPanel {
    groups: SkillGroupModel[];
    unlocked: string[];
    showAll: boolean;
}
