import {useCallback} from 'react';
import {useStore} from 'store/store.config';
import {ITranslateParams, ITranslation} from './lang';

const useLocalization = () => {
    const locale = useStore('locale') as ITranslation;

    return useCallback(
        (key: string, params?: ITranslateParams) => {
            let text: string = locale[key as keyof ITranslation] ?? key;
            if (params) {
                Object.keys(params).forEach((param) => {
                    text = text.split(`{${param}}`).join(String(params[param]));
                });
            }
            return text;
        },
        [locale],
    );
};

export default useLocalization;
