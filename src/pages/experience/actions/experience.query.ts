import {useQuery} from 'react-query';
import ExperienceModel from '../models/experience.model';
import {getExperience} from './experience.service';

export const useGetExperience = () => {
    return useQuery<ExperienceModel[], Error>(['experience'], () => {
        return getExperience();
    }, {
        staleTime: Infinity,
        cacheTime: Infinity,
        retry: false,
        retryOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });
};
