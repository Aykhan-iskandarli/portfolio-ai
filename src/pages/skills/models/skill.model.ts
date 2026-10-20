export default class SkillModel {
    public key: string | null = null;
    public name: string | null = null;

    constructor(item: any) {
        this._setKey(item);
        this._setName(item);
    }

    private _setKey({key}: any) {
        this.key = key ?? null;
    }

    private _setName({name}: any) {
        this.name = name ?? null;
    }
}
