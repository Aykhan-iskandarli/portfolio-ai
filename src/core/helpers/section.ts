import {Routes} from 'router/routes';
import {sections} from 'core/configs/scene.config';
import {ISceneSection} from 'core/layouts/scene/scene';

// URL-dən aktiv bölməni tapır: '/' → null, '/projects/x' → 'projects', naməlum → 'none'
export const getSectionFromPath = (pathname: string): ISceneSection => {
    const path = pathname.replace(/\/+$/, '') || Routes.home;
    if (path === Routes.home) return null;
    const section = sections.find((item) => path === item.route || path.startsWith(`${item.route}/`));
    return section ? section.id : 'none';
};
