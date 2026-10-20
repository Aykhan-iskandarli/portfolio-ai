import ExperienceModel from '../../models/experience.model';

export type IRoadScreen = 'title' | 'driving' | 'paused' | 'finished';

export interface ICareerRoad {
    // Xronoloji ardıcıllıqla (ən köhnə iş birinci)
    jobs: ExperienceModel[];
    onCheckpoint: (jobKey: string | null) => void;
    onContact: () => void;
}
