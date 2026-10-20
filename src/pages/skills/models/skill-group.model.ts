import SkillModel from './skill.model';

export default class SkillGroupModel {
    public key: string | null = null;
    public icon: string | null = null;
    public items: SkillModel[] = [];

    constructor(item: any) {
        this._setKey(item);
        this._setIcon(item);
        this._setItems(item);
    }

    private _setKey({key}: any) {
        this.key = key ?? null;
    }

    private _setIcon({icon}: any) {
        this.icon = icon ?? null;
    }

    private _setItems({items}: any) {
        this.items = items?.map((i: any) => new SkillModel(i)) ?? [];
    }
}
