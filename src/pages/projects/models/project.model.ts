export default class ProjectModel {
    public slug: string | null = null;
    public key: string | null = null;
    public image: string | null = null;
    public screenshots: string[] = [];
    public tech: string[] = [];
    public liveUrl: string | null = null;
    public githubUrl: string | null = null;

    constructor(item: any) {
        this._setSlug(item);
        this._setKey(item);
        this._setImage(item);
        this._setScreenshots(item);
        this._setTech(item);
        this._setLiveUrl(item);
        this._setGithubUrl(item);
    }

    private _setSlug({slug}: any) {
        this.slug = slug ?? null;
    }

    private _setKey({key}: any) {
        this.key = key ?? null;
    }

    private _setImage({image}: any) {
        this.image = image ?? null;
    }

    private _setScreenshots({screenshots}: any) {
        this.screenshots = screenshots ?? [];
    }

    private _setTech({tech}: any) {
        this.tech = tech ?? [];
    }

    private _setLiveUrl({liveUrl}: any) {
        this.liveUrl = liveUrl || null;
    }

    private _setGithubUrl({githubUrl}: any) {
        this.githubUrl = githubUrl || null;
    }
}
