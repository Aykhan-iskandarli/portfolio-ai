import SkillGroupModel from '../../models/skill-group.model';

export type IGameScreen = 'title' | 'map' | 'playing' | 'cleared' | 'finished';

export interface ISkillGame {
    groups: SkillGroupModel[];
    unlocked: string[];
    onUnlock: (skillKey: string) => void;
    onViewAll: () => void;
    onReplay: () => void;
}

export interface ISkillPopup {
    id: number;
    name: string;
    descriptionKey: string;
    color: string;
}
