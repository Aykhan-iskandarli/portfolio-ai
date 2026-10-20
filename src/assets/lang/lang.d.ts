import {az} from './az';

export type ILang = 'az' | 'en' | 'ru';

// az.ts əsas mənbədir: en.ts və ru.ts bu tipə uyğun olmalıdır, çatışmayan key build-də xəta verir
export type ITranslationKey = keyof typeof az;

export type ITranslation = Record<ITranslationKey, string>;

export type ITranslateParams = Record<string, string | number>;
