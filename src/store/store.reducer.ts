import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {az} from 'assets/lang/az';
import {en} from 'assets/lang/en';
import {ru} from 'assets/lang/ru';
import {ILang} from 'assets/lang/lang';
import {environment} from 'core/configs/app.config';
import {IState} from './store';

const lang = {az, en, ru};
const localeStorageKey = `${environment.applicationName}-locale`;

const getInitialLang = (): ILang => {
    const saved = localStorage.getItem(localeStorageKey);
    return saved === 'az' || saved === 'en' || saved === 'ru' ? saved : 'az';
};

const initialLang = getInitialLang();

const initialState: IState = {
    loader: false,
    locale: lang[initialLang],
    lang: initialLang,
    languages: [
        {id: 1, key: 'az', value: 'Az'},
        {id: 2, key: 'en', value: 'En'},
        {id: 3, key: 'ru', value: 'Ru'},
    ],
    soundEnabled: false,
};

export const rootSlice = createSlice({
    name: 'root',
    initialState,
    reducers: {
        setLoader: (state: IState, action: PayloadAction<boolean>) => {
            state.loader = action.payload;
        },
        setLocale: (state: IState, action: PayloadAction<ILang>) => {
            state.locale = lang[action.payload];
            state.lang = action.payload;
            localStorage.setItem(localeStorageKey, action.payload);
            document.documentElement.lang = action.payload;
        },
        setSoundEnabled: (state: IState, action: PayloadAction<boolean>) => {
            state.soundEnabled = action.payload;
        },
    },
});

export const {setLoader, setLocale, setSoundEnabled} = rootSlice.actions;
export default rootSlice.reducer;
