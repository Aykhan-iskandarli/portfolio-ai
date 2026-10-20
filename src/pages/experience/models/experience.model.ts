export default class ExperienceModel {
    public key: string | null = null;
    public company: string | null = null;
    public start: string | null = null;
    public end: string | null = null;

    constructor(item: any) {
        this._setKey(item);
        this._setCompany(item);
        this._setStart(item);
        this._setEnd(item);
    }

    private _setKey({key}: any) {
        this.key = key ?? null;
    }

    private _setCompany({company}: any) {
        this.company = company ?? null;
    }

    private _setStart({start}: any) {
        this.start = start ?? null;
    }

    // null → hazırda bu işdə işləyir
    private _setEnd({end}: any) {
        this.end = end ?? null;
    }
}
