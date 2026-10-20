import {Routes} from 'router/routes';

export type ISectionId = 'projects' | 'about' | 'skills' | 'experience' | 'contact';

// null → otaq, 'none' → mövcud olmayan səhifə (404 ekranın içində göstərilir)
export type ISceneSection = ISectionId | 'none' | null;

export type IScenePhase = 'room' | 'inserting' | 'booting' | 'zooming' | 'screen' | 'leaving';

export type ICrtState = 'off' | 'booting' | 'on';

export type ISceneLayout = 'landscape' | 'portrait';

export interface IRect {
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface IPlacement {
    x: number;
    y: number;
    rotate: number;
}

export interface ISection {
    id: ISectionId;
    route: Routes;
    color: string;
    titleKey: string;
    dialogKey: string;
    placement: Record<ISceneLayout, IPlacement>;
}

export interface ICameraTransform {
    x: number;
    y: number;
    scale: number;
}
