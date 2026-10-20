import {ILang, ITranslation} from 'assets/lang/lang';

export interface IState {
    loader: boolean;
    locale: ITranslation;
    lang: ILang;
    languages: ILanguages[];
    soundEnabled: boolean;
}

export interface ILanguages {
    id: number;
    key: ILang;
    value: string;
}
