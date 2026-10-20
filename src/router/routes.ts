export enum Routes {
    home = '/',
    projects = '/projects',
    projectDetails = '/projects/:slug',
    about = '/about',
    skills = '/skills',
    experience = '/experience',
    contact = '/contact',
}

export const goTo = (route: string, param: string | number) => {
    return route + '/' + param;
};

export const goToWithQuery = (route: string, param: Record<string, string | number> | null) => {
    let path = route + '?';
    if (param)
        for (const key in param) {
            if (path.substring(path.length - 1) !== '?')
                path += '&';
            path += key + '=' + param[`${key}`];
        }
    return path;
};
