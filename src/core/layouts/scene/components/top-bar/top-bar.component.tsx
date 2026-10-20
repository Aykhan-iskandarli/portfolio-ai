import {MouseEvent, useCallback, useMemo} from 'react';
import {Dropdown, MenuProps} from 'antd';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import classNames from 'classnames';
import {useStore} from 'store/store.config';
import {setLocale, setSoundEnabled} from 'store/store.reducer';
import {Routes} from 'router/routes';
import {sections} from 'core/configs/scene.config';
import useLocalization from 'assets/lang';
import {MenuIcon, SoundOffIcon, SoundOnIcon} from 'assets/images/icons/icons';
import {ILang} from 'assets/lang/lang';
import {useTopBarStyles} from './top-bar.style';

function TopBarComponent() {
    const translate = useLocalization();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const lang = useStore('lang');
    const languages = useStore('languages');
    const soundEnabled = useStore('soundEnabled');
    const {bar, pill, iconPill, languageGroup, languageButton, active} = useTopBarStyles();

    const menuItems: MenuProps['items'] = useMemo(() => [
        {key: Routes.home, label: translate('room')},
        {type: 'divider'},
        ...sections.map((section) => ({key: section.route, label: translate(section.titleKey)})),
    ], [translate]);

    const handleMenuClick: MenuProps['onClick'] = useCallback(({key}: {key: string}) => {
        navigate(key);
    }, [navigate]);

    const handleLanguage = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        dispatch(setLocale(event.currentTarget.dataset.lang as ILang));
    }, [dispatch]);

    const handleSound = useCallback(() => {
        dispatch(setSoundEnabled(!soundEnabled));
    }, [dispatch, soundEnabled]);

    return (
        <nav className={bar} aria-label={translate('menu')}>
            <Dropdown menu={{items: menuItems, onClick: handleMenuClick}} trigger={['click']}>
                <button type='button' className={pill} aria-label={translate('menu_open')}>
                    <MenuIcon/>
                    <span>{translate('menu')}</span>
                </button>
            </Dropdown>

            <div className={languageGroup} role='group' aria-label={translate('language')}>
                {languages.map((language) => (
                    <button
                        key={language.key}
                        type='button'
                        lang={language.key}
                        data-lang={language.key}
                        className={classNames(languageButton, {[active]: language.key === lang})}
                        aria-pressed={language.key === lang}
                        onClick={handleLanguage}
                    >
                        {language.value}
                    </button>
                ))}
            </div>

            <button
                type='button'
                className={classNames(pill, iconPill)}
                aria-pressed={soundEnabled}
                aria-label={soundEnabled ? translate('sound_off') : translate('sound_on')}
                onClick={handleSound}
            >
                {soundEnabled ? <SoundOnIcon/> : <SoundOffIcon/>}
            </button>
        </nav>
    );
}

export default TopBarComponent;
