import {useEffect, useRef} from 'react';
import {AnimatePresence, motion, useReducedMotion} from 'framer-motion';
import {sceneConfig} from 'core/configs/scene.config';
import useLocalization from 'assets/lang';
import {EjectIcon} from 'assets/images/icons/icons';
import {useScreenStyles} from './screen.style';
import {IScreen} from './screen';

// Kamera CRT-yə zoom etdikdən sonra viewport-u tutan "ekran". Məzmun adi, scroll olunan veb səhifədir;
// CRT çərçivəsi, scanline və parıltı yalnız kənarlarda dekorativ qatdır.
function ScreenComponent({visible, contentKey, children, onEject}: IScreen) {
    const translate = useLocalization();
    const reduceMotion = useReducedMotion();
    const {screen, frame, scroll, inner, eject} = useScreenStyles();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (visible) {
            scrollRef.current?.focus({preventScroll: true});
        }
    }, [visible]);

    useEffect(() => {
        scrollRef.current?.scrollTo({top: 0});
    }, [contentKey]);

    return (
        <motion.div
            className={screen}
            initial={{opacity: 0}}
            animate={{opacity: visible ? 1 : 0}}
            transition={{duration: reduceMotion ? sceneConfig.timing.reducedFade : sceneConfig.timing.contentFade}}
        >
            <button type='button' className={eject} onClick={onEject} aria-label={translate('eject_label')}>
                <EjectIcon/>
                <span>{translate('eject')}</span>
            </button>

            <div ref={scrollRef} className={scroll} tabIndex={-1}>
                <AnimatePresence mode='wait' initial={false}>
                    <motion.main
                        key={contentKey}
                        className={inner}
                        initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: 16}}
                        animate={{opacity: 1, y: 0}}
                        exit={reduceMotion ? {opacity: 0} : {opacity: 0, y: -10}}
                        transition={{duration: 0.25, ease: 'easeOut'}}
                    >
                        {children}
                    </motion.main>
                </AnimatePresence>
            </div>

            <div className={frame} aria-hidden='true'/>
        </motion.div>
    );
}

export default ScreenComponent;
