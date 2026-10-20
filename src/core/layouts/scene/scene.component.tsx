import {PointerEvent, useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useLocation, useNavigate, useOutlet} from 'react-router-dom';
import {AnimatePresence, animate, AnimationPlaybackControls, motion, useMotionValue, useReducedMotion, useSpring, useTransform} from 'framer-motion';
import {Routes} from 'router/routes';
import {sceneConfig, sections} from 'core/configs/scene.config';
import {profile} from 'core/configs/content.config';
import {delay, getCameraTransform} from 'core/helpers/camera';
import {getSectionFromPath} from 'core/helpers/section';
import {playCrtOn, playEject, playInsert} from 'core/helpers/sound';
import SeoComponent from 'core/shared/seo/seo.component';
import useLocalization from 'assets/lang';
import colors from 'assets/styles/abstracts/color';
import RoomComponent from './components/room/room.component';
import ConsoleComponent from './components/console/console.component';
import CrtComponent from './components/crt/crt.component';
import CartridgeComponent from './components/cartridge/cartridge.component';
import DialogBoxComponent from './components/dialog-box/dialog-box.component';
import TopBarComponent from './components/top-bar/top-bar.component';
import ScreenComponent from './components/screen/screen.component';
import {useSceneStyles} from './scene.style';
import {ICameraTransform, ICrtState, IScenePhase, ISceneLayout, ISection, ISectionId} from './scene';

const getViewport = () => ({width: window.innerWidth, height: window.innerHeight});

const getLayout = (viewport: {width: number; height: number}): ISceneLayout => {
    return viewport.width / viewport.height < sceneConfig.portraitRatio ? 'portrait' : 'landscape';
};

// Kameranın fokus nöqtəsi — CRT ekranının mərkəzi
const focal = {
    x: sceneConfig.screen.x + sceneConfig.screen.w / 2,
    y: sceneConfig.screen.y + sceneConfig.screen.h / 2,
};

function SceneComponent() {
    const translate = useLocalization();
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const outlet = useOutlet();
    const reduceMotion = useReducedMotion();
    const {scene, stage, layer, dialogArea} = useSceneStyles();

    const section = getSectionFromPath(pathname);

    const [viewport, setViewport] = useState(getViewport);
    const layout = getLayout(viewport);

    const [phase, setPhaseState] = useState<IScenePhase>('room');
    const [insertedId, setInsertedIdState] = useState<ISectionId | null>(null);
    const [crtState, setCrtState] = useState<ICrtState>('off');
    const [ledOn, setLedOn] = useState(false);
    const [hoveredId, setHoveredId] = useState<ISectionId | null>(null);
    const [focusId, setFocusId] = useState<ISectionId | null>(null);

    const phaseRef = useRef<IScenePhase>('room');
    const insertedRef = useRef<ISectionId | null>(null);
    const viewportRef = useRef(viewport);
    const sectionRef = useRef(section);
    const tokenRef = useRef(0);
    const firstRef = useRef(true);
    const cameraAnimationRef = useRef<AnimationPlaybackControls | null>(null);
    const stageRef = useRef<HTMLDivElement>(null);

    // Son göstərilən məzmun: eject zamanı URL artıq '/' olsa da ekran sönənə qədər görünür
    const lastOutletRef = useRef(outlet);
    const lastKeyRef = useRef(pathname);
    if (section !== null && outlet) {
        lastOutletRef.current = outlet;
        lastKeyRef.current = pathname;
    }

    viewportRef.current = viewport;
    sectionRef.current = section;

    const cameraX = useMotionValue(0);
    const cameraY = useMotionValue(0);
    const cameraScale = useMotionValue(1);

    const pointerX = useMotionValue(0);
    const pointerY = useMotionValue(0);
    const springX = useSpring(pointerX, {stiffness: 60, damping: 18});
    const springY = useSpring(pointerY, {stiffness: 60, damping: 18});
    const roomX = useTransform(springX, (value) => value * -sceneConfig.parallax.room);
    const roomY = useTransform(springY, (value) => value * -sceneConfig.parallax.room);
    const cartridgesX = useTransform(springX, (value) => value * -sceneConfig.parallax.cartridges);
    const cartridgesY = useTransform(springY, (value) => value * -sceneConfig.parallax.cartridges);

    const setPhase = useCallback((value: IScenePhase) => {
        phaseRef.current = value;
        setPhaseState(value);
    }, []);

    const setInsertedId = useCallback((value: ISectionId | null) => {
        insertedRef.current = value;
        setInsertedIdState(value);
    }, []);

    const getTransform = useCallback((target: 'room' | 'screen'): ICameraTransform => {
        const current = viewportRef.current;
        return target === 'room'
            ? getCameraTransform(sceneConfig.windows[getLayout(current)], current, 'contain')
            : getCameraTransform(sceneConfig.screen, current, 'cover');
    }, []);

    const applyCamera = useCallback((transform: ICameraTransform) => {
        cameraX.set(transform.x);
        cameraY.set(transform.y);
        cameraScale.set(transform.scale);
    }, [cameraX, cameraY, cameraScale]);

    const jumpCamera = useCallback((target: 'room' | 'screen') => {
        cameraAnimationRef.current?.stop();
        applyCamera(getTransform(target));
    }, [applyCamera, getTransform]);

    // Zoom: miqyas həndəsi, fokus nöqtəsinin ekrandakı yeri xətti dəyişir — kamera ekrana "uçur", sürüşmür
    const animateCamera = useCallback((target: 'room' | 'screen', duration: number) => {
        cameraAnimationRef.current?.stop();
        const from = {x: cameraX.get(), y: cameraY.get(), scale: cameraScale.get()};
        const to = getTransform(target);
        const startX = from.x + from.scale * focal.x;
        const startY = from.y + from.scale * focal.y;
        const endX = to.x + to.scale * focal.x;
        const endY = to.y + to.scale * focal.y;

        const controls = animate(0, 1, {
            duration,
            ease: sceneConfig.ease,
            onUpdate: (progress) => {
                const scale = from.scale * Math.pow(to.scale / from.scale, progress);
                applyCamera({
                    scale,
                    x: startX + (endX - startX) * progress - scale * focal.x,
                    y: startY + (endY - startY) * progress - scale * focal.y,
                });
            },
        });
        cameraAnimationRef.current = controls;
        return controls;
    }, [cameraX, cameraY, cameraScale, getTransform, applyCamera]);

    // URL dəyişdikcə səhnənin vəziyyətini idarə edən axın: insert → CRT → zoom → ekran, və əksinə
    useLayoutEffect(() => {
        const token = ++tokenRef.current;
        const alive = () => tokenRef.current === token;
        const isFirst = firstRef.current;
        firstRef.current = false;
        const currentPhase = phaseRef.current;
        const cartridgeId = section && section !== 'none' ? section : null;
        const {timing} = sceneConfig;

        const showScreenNow = () => {
            jumpCamera('screen');
            setInsertedId(cartridgeId);
            setLedOn(true);
            setCrtState('on');
            setPhase('screen');
        };

        const run = async () => {
            if (section !== null) {
                setFocusId(null);
                if (isFirst || reduceMotion) {
                    showScreenNow();
                    return;
                }
                if (currentPhase === 'screen') {
                    // Ekrandan başqa bölməyə keçid: kartric arxada dəyişir, məzmun crossfade olur
                    setInsertedId(cartridgeId);
                    return;
                }
                if (currentPhase !== 'room') {
                    // Animasiya yarımçıq kəsildi — qısa zoom ilə ekrana keç
                    setInsertedId(cartridgeId);
                    setLedOn(true);
                    setCrtState('on');
                    setPhase('zooming');
                    await animateCamera('screen', 0.45);
                    if (alive()) setPhase('screen');
                    return;
                }

                setInsertedId(cartridgeId);
                setPhase('inserting');
                await delay(timing.insert * 0.88);
                if (!alive()) return;

                playInsert();
                setLedOn(true);
                setCrtState('booting');
                setPhase('booting');
                await delay(timing.boot * 0.3);
                if (!alive()) return;
                playCrtOn();
                await delay(timing.boot * 0.7);
                if (!alive()) return;

                setCrtState('on');
                setPhase('zooming');
                await animateCamera('screen', timing.zoomIn);
                if (alive()) setPhase('screen');
                return;
            }

            if (isFirst || currentPhase === 'room') {
                jumpCamera('room');
                setPhase('room');
                return;
            }

            const ejectedId = insertedRef.current;
            setPhase('leaving');
            await delay(reduceMotion ? timing.reducedFade : timing.contentFade);
            if (!alive()) return;

            if (reduceMotion) {
                jumpCamera('room');
            } else {
                await animateCamera('room', timing.zoomOut);
                if (!alive()) return;
            }

            setCrtState('off');
            setLedOn(false);
            setInsertedId(null);
            playEject();
            setPhase('room');
            setFocusId(ejectedId);
        };

        run();
    }, [section, reduceMotion, jumpCamera, animateCamera, setInsertedId, setPhase]);

    useEffect(() => {
        const handleResize = () => setViewport(getViewport());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Ölçü dəyişəndə kameranı cari vəziyyətə uyğun yenidən yerləşdir
    useEffect(() => {
        if (phaseRef.current === 'room') jumpCamera('room');
        if (phaseRef.current === 'screen') jumpCamera('screen');
    }, [viewport, jumpCamera]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && !event.defaultPrevented && sectionRef.current !== null) {
                navigate(Routes.home);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [navigate]);

    // Ekran açıq olanda otaq klaviatura və ekran oxuyucu üçün əlçatmaz olur.
    // Layout effect: inert kartricin focus effektindən əvvəl götürülməlidir.
    useLayoutEffect(() => {
        const element = stageRef.current;
        if (!element) return;
        if (phase === 'room') {
            element.removeAttribute('inert');
        } else {
            element.setAttribute('inert', '');
        }
    }, [phase]);

    useEffect(() => {
        if (phase !== 'room') {
            pointerX.set(0);
            pointerY.set(0);
            setHoveredId(null);
        }
    }, [phase, pointerX, pointerY]);

    const handlePointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
        if (reduceMotion || event.pointerType !== 'mouse' || phaseRef.current !== 'room') return;
        const current = viewportRef.current;
        pointerX.set((event.clientX / current.width) * 2 - 1);
        pointerY.set((event.clientY / current.height) * 2 - 1);
    }, [reduceMotion, pointerX, pointerY]);

    const handleSelect = useCallback((item: ISection) => {
        navigate(item.route);
    }, [navigate]);

    const handleHover = useCallback((id: ISectionId | null) => {
        setHoveredId(id);
    }, []);

    const handleEject = useCallback(() => {
        navigate(Routes.home);
    }, [navigate]);

    const hoveredSection = sections.find((item) => item.id === hoveredId);
    const dialogText = hoveredSection
        ? translate(hoveredSection.dialogKey)
        : translate('dialog_greeting', {name: profile.name, role: translate('role')});
    const crtColor = sections.find((item) => item.id === insertedId)?.color ?? colors.screenGlow;

    return (
        <div className={scene} onPointerMove={handlePointerMove}>
            {section === null ? (
                <>
                    <SeoComponent titleKey='home_title' descriptionKey='home_description' path={Routes.home}/>
                    <h1 className='sr-only'>{profile.name} — {translate('role')}</h1>
                </>
            ) : null}

            <TopBarComponent/>

            <motion.div
                ref={stageRef}
                className={stage}
                style={{x: cameraX, y: cameraY, scale: cameraScale, width: sceneConfig.width, height: sceneConfig.height}}
                role='region'
                aria-label={translate('scene_label')}
                aria-hidden={phase !== 'room'}
            >
                <motion.div className={layer} style={{x: roomX, y: roomY}}>
                    <RoomComponent/>
                    <CrtComponent state={crtState} color={crtColor}/>
                    <ConsoleComponent layer='body' ledOn={ledOn}/>
                </motion.div>

                <motion.div className={layer} style={{x: cartridgesX, y: cartridgesY}}>
                    {sections.map((item, index) => (
                        <CartridgeComponent
                            key={item.id}
                            section={item}
                            index={index}
                            layout={layout}
                            inserted={insertedId === item.id}
                            disabled={phase !== 'room'}
                            shouldFocus={focusId === item.id}
                            onSelect={handleSelect}
                            onHover={handleHover}
                        />
                    ))}
                </motion.div>

                <motion.div className={layer} style={{x: roomX, y: roomY}}>
                    <ConsoleComponent layer='front'/>
                </motion.div>
            </motion.div>

            <AnimatePresence>
                {phase === 'room' ? (
                    <motion.div
                        key='dialog'
                        className={dialogArea}
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 20}}
                        transition={{duration: 0.25}}
                    >
                        <DialogBoxComponent text={dialogText}/>
                    </motion.div>
                ) : null}
            </AnimatePresence>

            {phase === 'screen' || phase === 'leaving' ? (
                <ScreenComponent visible={phase === 'screen'} contentKey={lastKeyRef.current} onEject={handleEject}>
                    {lastOutletRef.current}
                </ScreenComponent>
            ) : null}
        </div>
    );
}

export default SceneComponent;
