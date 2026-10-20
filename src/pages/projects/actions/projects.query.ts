import {useQuery} from 'react-query';
import ProjectModel from '../models/project.model';
import {getProjects} from './projects.service';

export const useGetProjects = () => {
    return useQuery<ProjectModel[], Error>(['projects'], () => {
        return getProjects();
    }, {
        staleTime: Infinity,
        cacheTime: Infinity,
        retry: false,
        retryOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });
};
