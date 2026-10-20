import {PointerEvent, useCallback, useEffect, useMemo, useRef} from 'react';
import {motion, useAnimationControls, useMotionValue, useReducedMotion, useSpring} from 'framer-motion';
import {useStore} from 'store/store.config';
import {sceneConfig} from 'core/configs/scene.config';
import useLocalization from 'assets/lang';
import colors from 'assets/styles/abstracts/color';
import fonts from 'assets/styles/abstracts/fonts';
import {useCartridgeStyles} from './cartridge.style';
import {ICartridge} from './cartridge';

function CartridgeComponent({section, index, layout, inserted, disabled, shouldFocus, onSelect, onHover}: ICartridge) {
    const translate = useLocalization();
    const lang = useStore('lang');
    const reduceMotion = useReducedMotion();
    const {wrapper, bob, button, tooltip} = useCartridgeStyles();

    const controls = useAnimationControls();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const prevInsertedRef = useRef(inserted);
    const mountedRef = useRef(false);

    const tiltX = useMotionValue(0);
    const tiltY = useMotionValue(0);
    const rotateX = useSpring(tiltX, {stiffness: 220, damping: 18});
    const rotateY = useSpring(tiltY, {stiffness: 220, damping: 18});

    const title = translate(section.titleKey);
    const label = title.toLocaleUpperCase(lang);

    const poses = useMemo(() => {
        const {w, h, insertedScale} = sceneConfig.cartridge;
        const placement = section.placement[layout];
        const scale = sceneConfig.cartridgeScale[layout];
        return {
            idle: {x: placement.x - w / 2, y: placement.y - h / 2, rotate: placement.rotate, scale},
            slot: {x: sceneConfig.slot.x - w / 2, y: sceneConfig.slot.y - h / 2, rotate: 0, scale: insertedScale},
        };
    }, [section, layout]);

    useEffect(() => {
        const {idle, slot} = poses;
        const changed = prevInsertedRef.current !== inserted;
        prevInsertedRef.current = inserted;

        if (!mountedRef.current || reduceMotion) {
            mountedRef.current = true;
            controls.set(inserted ? slot : idle);
            return;
        }

        if (!changed) {
            controls.start(inserted ? slot : idle, {type: 'spring', stiffness: 160, damping: 22});
            return;
        }

        const apex = Math.min(idle.y, slot.y) - 220;
        const midX = (idle.x + slot.x) / 2;

        if (inserted) {
            controls.start({
                x: [idle.x, midX, slot.x, slot.x, slot.x],
                y: [idle.y, apex, slot.y - 60, slot.y + 6, slot.y],
                rotate: [idle.rotate, idle.rotate * 0.3 - 8, 0, 0, 0],
                scale: [idle.scale, idle.scale * 1.08, slot.scale, slot.scale, slot.scale],
            }, {duration: sceneConfig.timing.insert, times: [0, 0.45, 0.72, 0.88, 1], ease: 'easeInOut'});
        } else {
            controls.start({
                x: [slot.x, slot.x, midX, idle.x],
                y: [slot.y, slot.y - 70, apex, idle.y],
                rotate: [0, 0, idle.rotate - 10, idle.rotate],
                scale: [slot.scale, slot.scale, idle.scale * 1.08, idle.scale],
            }, {duration: sceneConfig.timing.eject, times: [0, 0.25, 0.6, 1], ease: 'easeOut'});
        }
    }, [inserted, poses, reduceMotion, controls]);

    useEffect(() => {
        if (shouldFocus) {
            buttonRef.current?.focus();
        }
    }, [shouldFocus]);

    const handleClick = useCallback(() => {
        onSelect(section);
    }, [onSelect, section]);

    const handleEnter = useCallback(() => {
        onHover(section.id);
    }, [onHover, section]);

    const handleLeave = useCallback(() => {
        onHover(null);
        tiltX.set(0);
        tiltY.set(0);
    }, [onHover, tiltX, tiltY]);

    const handlePointerMove = useCallback((event: PointerEvent<HTMLButtonElement>) => {
        if (reduceMotion || event.pointerType !== 'mouse') return;
        const rect = event.currentTarget.getBoundingClientRect();
        const dx = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
        const dy = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
        tiltY.set(dx * 24);
        tiltX.set(-dy * 24);
    }, [reduceMotion, tiltX, tiltY]);

    const longLabel = label.length > 9;

    return (
        <motion.div
            className={wrapper}
            style={{zIndex: inserted ? 3 : 1, width: sceneConfig.cartridge.w, height: sceneConfig.cartridge.h}}
            initial={inserted ? poses.slot : poses.idle}
            animate={controls}
        >
            <motion.div
                className={bob}
                animate={inserted || reduceMotion ? {y: 0} : {y: [0, -8, 0]}}
                transition={inserted || reduceMotion
                    ? {duration: 0.2}
                    : {duration: 2.6 + index * 0.35, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2}}
            >
                <motion.button
                    ref={buttonRef}
                    type='button'
                    className={button}
                    style={{rotateX, rotateY, transformPerspective: 600, '--glow': section.color} as never}
                    disabled={disabled}
                    aria-label={translate('cartridge_insert', {name: title})}
                    onClick={handleClick}
                    onMouseEnter={handleEnter}
                    onMouseLeave={handleLeave}
                    onFocus={handleEnter}
                    onBlur={handleLeave}
                    onPointerMove={handlePointerMove}
                    whileHover={disabled ? undefined : {y: -14, scale: 1.06}}
                    whileFocus={disabled ? undefined : {y: -14, scale: 1.06}}
                    whileTap={disabled ? undefined : {scale: 0.97}}
                    transition={{type: 'spring', stiffness: 320, damping: 20}}
                >
                    <svg viewBox='0 0 150 96' width='100%' height='100%' aria-hidden='true' focusable='false'>
                        <rect x={3} y={3} width={144} height={90} rx={11} fill={section.color} stroke={colors.outline} strokeWidth={4}/>
                        <rect x={3} y={62} width={144} height={31} rx={11} fill={colors.black} opacity={0.12}/>
                        {[0, 1, 2, 3, 4].map((ridge) => (
                            <rect key={ridge} x={40 + ridge * 15} y={9} width={8} height={7} rx={2} fill={colors.black} opacity={0.22}/>
                        ))}
                        <rect x={17} y={22} width={116} height={54} rx={7} fill={colors.cartridgeLabel} stroke={colors.outline} strokeWidth={3}/>
                        <rect x={17} y={22} width={116} height={13} rx={6} fill={section.color} opacity={0.85}/>
                        <rect x={17} y={30} width={116} height={5} fill={section.color} opacity={0.85}/>
                        <text
                            x={75}
                            y={61}
                            textAnchor='middle'
                            fontFamily={fonts.fontPixel}
                            fontWeight={700}
                            fontSize={longLabel ? 12 : 15}
                            fill={colors.outline}
                            textLength={longLabel ? 102 : undefined}
                            lengthAdjust='spacingAndGlyphs'
                        >
                            {label}
                        </text>
                        <rect x={55} y={82} width={40} height={8} rx={2} fill={colors.black} opacity={0.25}/>
                    </svg>
                    <span className={tooltip} aria-hidden='true'>{title}</span>
                </motion.button>
            </motion.div>
        </motion.div>
    );
}

export default CartridgeComponent;
