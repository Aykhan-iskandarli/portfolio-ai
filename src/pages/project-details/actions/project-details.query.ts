import {useQuery} from 'react-query';
import ProjectModel from 'pages/projects/models/project.model';
import {getProjectBySlug} from './project-details.service';

export const useGetProjectBySlug = (slug: string | null) => {
    return useQuery<ProjectModel | null, Error>(['project', slug], () => {
        return getProjectBySlug(slug!);
    }, {
        enabled: !!slug,
        staleTime: Infinity,
        cacheTime: Infinity,
        retry: false,
        retryOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });
};
