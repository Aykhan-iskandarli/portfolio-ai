import {useReducedMotion} from 'framer-motion';
import {useTypewriter} from 'core/helpers/typewriter';
import AvatarIcon from 'assets/images/icons/avatar';
import useLocalization from 'assets/lang';
import {useDialogBoxStyles} from './dialog-box.style';
import {IDialogBox} from './dialog-box';

function DialogBoxComponent({text}: IDialogBox) {
    const translate = useLocalization();
    const reduceMotion = useReducedMotion();
    const {dialog, avatar, message, caret} = useDialogBoxStyles();
    const {visibleText, done} = useTypewriter(text, !reduceMotion);

    return (
        <div className={dialog}>
            <div className={avatar}>
                <AvatarIcon title={translate('dialog_avatar_alt')}/>
            </div>
            {/* Ekran oxuyucu üçün tam mətn bir dəfə oxunur, hərf-hərf yazılan versiya gizlidir */}
            <p className='sr-only' aria-live='polite'>{text}</p>
            <p className={message} aria-hidden='true'>
                {visibleText}
                {done ? <span className={caret}>▼</span> : null}
            </p>
        </div>
    );
}

export default DialogBoxComponent;
