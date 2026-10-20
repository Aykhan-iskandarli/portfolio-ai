import {useQuery} from 'react-query';
import SkillGroupModel from '../models/skill-group.model';
import {getSkillGroups} from './skills.service';

export const useGetSkillGroups = () => {
    return useQuery<SkillGroupModel[], Error>(['skillGroups'], () => {
        return getSkillGroups();
    }, {
        staleTime: Infinity,
        cacheTime: Infinity,
        retry: false,
        retryOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });
};
