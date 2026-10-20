import {Routes} from 'router/routes';
import colors from 'assets/styles/abstracts/color';
import {IRect, ISceneLayout, ISection} from 'core/layouts/scene/scene';

// Səhnənin dizayn koordinatları (px). Bütün otaq bu sistemdə çəkilir,
// kamera isə görünən pəncərəni (window) viewport-a uyğunlaşdırır.
export const sceneConfig = {
    width: 1600,
    height: 1500,
    windows: {
        landscape: {x: 0, y: 0, w: 1600, h: 900},
        portrait: {x: 330, y: 190, w: 1000, h: 1290},
    } as Record<ISceneLayout, IRect>,
    // CRT ekranının şüşəsi — kamera bura zoom edir
    screen: {x: 1062, y: 282, w: 186, h: 146} as IRect,
    // Konsol və kartric yuvası
    console: {x: 610, y: 600, w: 300, h: 130} as IRect,
    slot: {x: 760, y: 596},
    cartridge: {w: 150, h: 96, insertedScale: 0.62},
    cartridgeScale: {landscape: 1, portrait: 1.45} as Record<ISceneLayout, number>,
    // Viewport eni/hündürlüyü bu dəyərdən kiçikdirsə portret layout işləyir
    portraitRatio: 0.9,
    parallax: {room: 6, cartridges: 14},
    // Animasiya müddətləri (saniyə)
    timing: {
        insert: 0.75,
        boot: 0.55,
        zoomIn: 1.05,
        contentFade: 0.25,
        zoomOut: 0.85,
        eject: 0.6,
        reducedFade: 0.3,
    },
    ease: [0.65, 0, 0.35, 1] as [number, number, number, number],
};

export const sections: ISection[] = [
    {
        id: 'projects',
        route: Routes.projects,
        color: colors.cartridgeProjects,
        titleKey: 'section_projects',
        dialogKey: 'dialog_projects',
        placement: {
            landscape: {x: 300, y: 700, rotate: -14},
            portrait: {x: 500, y: 960, rotate: -10},
        },
    },
    {
        id: 'about',
        route: Routes.about,
        color: colors.cartridgeAbout,
        titleKey: 'section_about',
        dialogKey: 'dialog_about',
        placement: {
            landscape: {x: 480, y: 610, rotate: -8},
            portrait: {x: 830, y: 930, rotate: 4},
        },
    },
    {
        id: 'skills',
        route: Routes.skills,
        color: colors.cartridgeSkills,
        titleKey: 'section_skills',
        dialogKey: 'dialog_skills',
        placement: {
            landscape: {x: 400, y: 835, rotate: -8},
            portrait: {x: 1150, y: 990, rotate: 10},
        },
    },
    {
        id: 'experience',
        route: Routes.experience,
        color: colors.cartridgeExperience,
        titleKey: 'section_experience',
        dialogKey: 'dialog_experience',
        placement: {
            landscape: {x: 1150, y: 700, rotate: 8},
            portrait: {x: 640, y: 1170, rotate: -6},
        },
    },
    {
        id: 'contact',
        route: Routes.contact,
        color: colors.cartridgeContact,
        titleKey: 'section_contact',
        dialogKey: 'dialog_contact',
        placement: {
            landscape: {x: 1250, y: 835, rotate: 12},
            portrait: {x: 1010, y: 1190, rotate: 7},
        },
    },
];
