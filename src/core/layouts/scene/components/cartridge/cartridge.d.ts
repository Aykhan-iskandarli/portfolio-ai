import {ISceneLayout, ISection, ISectionId} from '../../scene';

export interface ICartridge {
    section: ISection;
    index: number;
    layout: ISceneLayout;
    inserted: boolean;
    disabled: boolean;
    shouldFocus: boolean;
    onSelect: (section: ISection) => void;
    onHover: (id: ISectionId | null) => void;
}
