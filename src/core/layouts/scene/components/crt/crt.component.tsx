import {AnimatePresence, motion} from 'framer-motion';
import {sceneConfig} from 'core/configs/scene.config';
import {useCrtStyles} from './crt.style';
import {ICrt} from './crt';

// Otaqdakı televizorun şüşəsi üzərində yanma effekti: flicker → üfüqi xətt açılır → statik → işıq
function CrtComponent({state, color}: ICrt) {
    const {crt, line, staticNoise, glow} = useCrtStyles();
    const {x, y, w, h} = sceneConfig.screen;

    return (
        <div className={crt} style={{left: x, top: y, width: w, height: h}} aria-hidden='true'>
            <AnimatePresence>
                {state !== 'off' ? (
                    <motion.div
                        key='crt-on'
                        className={glow}
                        style={{'--crt-color': color} as React.CSSProperties}
                        initial={{opacity: 0}}
                        animate={{opacity: state === 'booting' ? [0, 1, 0.35, 1, 0.6, 1] : 1}}
                        exit={{opacity: 0, transition: {duration: 0.2}}}
                        transition={{duration: sceneConfig.timing.boot, times: [0, 0.15, 0.3, 0.5, 0.7, 1]}}
                    >
                        {state === 'booting' ? (
                            <>
                                <motion.div
                                    className={line}
                                    initial={{scaleY: 0.02, scaleX: 0.2}}
                                    animate={{scaleY: [0.02, 0.02, 1], scaleX: [0.2, 1, 1]}}
                                    transition={{duration: sceneConfig.timing.boot, times: [0, 0.35, 1], ease: 'easeOut'}}
                                />
                                <div className={staticNoise}/>
                            </>
                        ) : null}
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    );
}

export default CrtComponent;
