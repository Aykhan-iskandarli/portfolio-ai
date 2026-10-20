import {KeyboardEvent, PointerEvent, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Button} from 'antd';
import classNames from 'classnames';
import {playBlock, playFlag, playJump} from 'core/helpers/sound';
import useLocalization from 'assets/lang';
import colors from 'assets/styles/abstracts/color';
import {createGameState, createLevel, VIEW_HEIGHT, VIEW_WIDTH_NARROW, VIEW_WIDTH_WIDE} from './engine/levels';
import {stepGame} from './engine/physics';
import {renderGame} from './engine/render';
import {IGameEvent, IGameInput, IGameState} from './engine/engine';
import {useSkillGameStyles} from './skill-game.style';
import {IGameScreen, ISkillGame, ISkillPopup} from './skill-game';

const levelColors = [colors.cartridgeSkills, colors.cartridgeAbout, colors.cartridgeContact];
const confettiColors = [colors.cartridgeProjects, colors.cartridgeAbout, colors.cartridgeSkills, colors.cartridgeExperience, colors.cartridgeContact];

const keyMap: Record<string, keyof Omit<IGameInput, 'jumpPressed'>> = {
    ArrowLeft: 'left',
    a: 'left',
    A: 'left',
    ArrowRight: 'right',
    d: 'right',
    D: 'right',
    ' ': 'jump',
    ArrowUp: 'jump',
    w: 'jump',
    W: 'jump',
};

function SkillGameComponent({groups, unlocked, onUnlock, onViewAll, onReplay}: ISkillGame) {
    const translate = useLocalization();
    const classes = useSkillGameStyles();

    const frameRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const stateRef = useRef<IGameState | null>(null);
    const inputRef = useRef<IGameInput>({left: false, right: false, jump: false, jumpPressed: false});
    const unlockedRef = useRef(unlocked);
    unlockedRef.current = unlocked;

    const [screen, setScreen] = useState<IGameScreen>('title');
    const [levelIndex, setLevelIndex] = useState(0);
    const [viewWidth, setViewWidth] = useState(VIEW_WIDTH_WIDE);
    const [popup, setPopup] = useState<ISkillPopup | null>(null);

    const unlockedCount = groups.reduce((sum, group) => sum + group.items.filter((skill) => unlocked.includes(skill.key ?? '')).length, 0);
    const currentGroup = groups[levelIndex];
    const levelUnlocked = currentGroup ? currentGroup.items.filter((skill) => unlocked.includes(skill.key ?? '')).length : 0;

    const buildState = useCallback((index: number) => {
        return createGameState(
            createLevel(groups[index], index, levelColors[index % levelColors.length], unlockedRef.current),
            viewWidth,
        );
    }, [groups, viewWidth]);

    const draw = useCallback(() => {
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx && stateRef.current) renderGame(ctx, stateRef.current);
    }, []);

    const resetInput = useCallback(() => {
        inputRef.current = {left: false, right: false, jump: false, jumpPressed: false};
    }, []);

    // Dar konteynerdə kamera daha az tile göstərir — piksellər mobildə də iri qalsın
    useEffect(() => {
        const frame = frameRef.current;
        if (!frame) return;
        const observer = new ResizeObserver(([entry]) => {
            setViewWidth(entry.contentRect.width < 560 ? VIEW_WIDTH_NARROW : VIEW_WIDTH_WIDE);
        });
        observer.observe(frame);
        return () => observer.disconnect();
    }, []);

    // Oyun getmədikdə (başlıq, xəritə, nəticə) arxa fonda səviyyənin statik kadrı görünür
    useEffect(() => {
        if (!groups.length) return;
        if (!stateRef.current || stateRef.current.level.groupKey !== groups[levelIndex]?.key) {
            stateRef.current = buildState(levelIndex);
        }
        stateRef.current.viewWidth = viewWidth;
        if (screen !== 'playing') draw();
    }, [screen, levelIndex, viewWidth, groups, buildState, draw]);

    const handleEvent = useCallback((event: IGameEvent) => {
        if (event.type === 'jump') {
            playJump();
            return;
        }
        if (event.type === 'block') {
            playBlock();
            onUnlock(event.skillKey);
            const groupIndex = groups.findIndex((group) => group.items.some((skill) => skill.key === event.skillKey));
            const skill = groups[groupIndex]?.items.find((item) => item.key === event.skillKey);
            setPopup({
                id: Date.now(),
                name: skill?.name ?? event.skillKey,
                descriptionKey: `skill_${event.skillKey}_desc`,
                color: levelColors[groupIndex % levelColors.length],
            });
            return;
        }
        playFlag();
        resetInput();
        const opened = new Set([
            ...unlockedRef.current,
            ...(stateRef.current?.level.blocks.filter((block) => block.used).map((block) => block.skillKey) ?? []),
        ]);
        const allOpened = groups.every((group) => group.items.every((skill) => opened.has(skill.key ?? '')));
        setScreen(allOpened ? 'finished' : 'cleared');
    }, [groups, onUnlock, resetInput]);

    const handleEventRef = useRef(handleEvent);
    handleEventRef.current = handleEvent;

    useEffect(() => {
        if (screen !== 'playing') return;
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;

        frameRef.current?.focus({preventScroll: true});
        let frame = 0;
        let last = performance.now();
        const tick = (now: number) => {
            const dt = Math.min((now - last) / 1000, 1 / 30);
            last = now;
            const state = stateRef.current;
            if (state && !document.hidden) {
                stepGame(state, inputRef.current, dt).forEach((event) => handleEventRef.current(event));
                renderGame(ctx, state);
            }
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [screen]);

    useEffect(() => {
        if (!popup) return;
        const timeout = setTimeout(() => setPopup(null), 2600);
        return () => clearTimeout(timeout);
    }, [popup]);

    const startLevel = useCallback((index: number) => {
        resetInput();
        stateRef.current = buildState(index);
        setLevelIndex(index);
        setPopup(null);
        setScreen('playing');
    }, [buildState, resetInput]);

    const handleStart = useCallback(() => {
        if (unlockedCount > 0) {
            setScreen('map');
        } else {
            startLevel(0);
        }
    }, [unlockedCount, startLevel]);

    const handleMap = useCallback(() => {
        resetInput();
        setScreen('map');
    }, [resetInput]);

    const handleLevel = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        startLevel(Number(event.currentTarget.dataset.level));
    }, [startLevel]);

    const handleNext = useCallback(() => {
        startLevel(levelIndex + 1);
    }, [startLevel, levelIndex]);

    const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
        if (screen !== 'playing') return;
        const action = keyMap[event.key];
        if (!action) return;
        event.preventDefault();
        if (action === 'jump' && !event.repeat) inputRef.current.jumpPressed = true;
        inputRef.current[action] = true;
    }, [screen]);

    const handleKeyUp = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
        const action = keyMap[event.key];
        if (action) inputRef.current[action] = false;
    }, []);

    const handleControlDown = useCallback((event: PointerEvent<HTMLButtonElement>) => {
        const action = event.currentTarget.dataset.control as keyof Omit<IGameInput, 'jumpPressed'>;
        event.currentTarget.setPointerCapture(event.pointerId);
        if (action === 'jump') inputRef.current.jumpPressed = true;
        inputRef.current[action] = true;
    }, []);

    const handleControlUp = useCallback((event: PointerEvent<HTMLButtonElement>) => {
        const action = event.currentTarget.dataset.control as keyof Omit<IGameInput, 'jumpPressed'>;
        inputRef.current[action] = false;
    }, []);

    const confetti = useMemo(() => Array.from({length: 28}).map((_, index) => ({
        left: `${(index * 37) % 100}%`,
        delay: `${(index % 7) * 0.18}s`,
        duration: `${2.2 + (index % 5) * 0.35}s`,
        color: confettiColors[index % confettiColors.length],
    })), []);

    return (
        <div className={classes.game}>
            <div
                ref={frameRef}
                className={classes.frame}
                style={{aspectRatio: `${viewWidth} / ${VIEW_HEIGHT}`}}
                tabIndex={0}
                role='application'
                aria-label={translate('skills_game_label')}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                onBlur={resetInput}
            >
                <canvas ref={canvasRef} className={classes.canvas} width={viewWidth} height={VIEW_HEIGHT} aria-hidden='true'/>

                {screen === 'playing' && currentGroup ? (
                    <div className={classes.hud}>
                        <span className={classes.hudLabel}>
                            1-{levelIndex + 1} · {translate(`skills_group_${currentGroup.key}`)}
                        </span>
                        <span className={classes.hudLabel}>{levelUnlocked}/{currentGroup.items.length}</span>
                        <button type='button' className={classes.hudButton} onClick={handleMap}>
                            {translate('skills_game_map')}
                        </button>
                    </div>
                ) : null}

                {popup && screen === 'playing' ? (
                    <div key={popup.id} className={classes.popup} style={{borderColor: popup.color}}>
                        <strong>{popup.name}</strong>
                        <span>{translate(popup.descriptionKey)}</span>
                    </div>
                ) : null}

                {screen === 'title' ? (
                    <div className={classes.overlay}>
                        <p className={classes.logo}>
                            <span className={classes.logoSmall}>The</span>
                            <span>Iskandarli</span>
                        </p>
                        <p className={classes.subtitle}>{translate('skills_game_subtitle')}</p>
                        <Button type='primary' size='large' onClick={handleStart}>
                            {unlockedCount > 0 ? translate('skills_game_continue') : translate('skills_game_start')}
                        </Button>
                        <p className={classNames(classes.hint, classes.hintKeys)}>{translate('skills_game_hint')}</p>
                        <p className={classNames(classes.hint, classes.hintTouch)}>{translate('skills_game_hint_touch')}</p>
                    </div>
                ) : null}

                {screen === 'map' ? (
                    <div className={classes.overlay}>
                        <p className={classes.overlayTitle}>{translate('skills_game_map_title')}</p>
                        <ol className={classes.map}>
                            {groups.map((group, index) => {
                                const done = group.items.filter((skill) => unlocked.includes(skill.key ?? '')).length;
                                const complete = done === group.items.length;
                                return (
                                    <li key={group.key} className={classes.mapItem}>
                                        <button
                                            type='button'
                                            className={classNames(classes.mapNode, {[classes.mapNodeDone]: complete})}
                                            style={{borderColor: levelColors[index % levelColors.length]}}
                                            data-level={index}
                                            onClick={handleLevel}
                                        >
                                            <span className={classes.mapNumber}>1-{index + 1}</span>
                                            <span>{translate(`skills_group_${group.key}`)}</span>
                                            <span className={classes.mapCount}>{complete ? '★ ' : ''}{done}/{group.items.length}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                ) : null}

                {screen === 'cleared' && currentGroup ? (
                    <div className={classes.overlay}>
                        <p className={classes.overlayTitle}>{translate('skills_game_cleared')}</p>
                        <p className={classes.subtitle}>
                            {translate('skills_game_cleared_text', {count: levelUnlocked, total: currentGroup.items.length})}
                        </p>
                        <div className={classes.actions}>
                            <Button size='large' onClick={handleMap}>{translate('skills_game_map')}</Button>
                            {levelIndex + 1 < groups.length ? (
                                <Button type='primary' size='large' onClick={handleNext}>{translate('skills_game_next')}</Button>
                            ) : null}
                        </div>
                    </div>
                ) : null}

                {screen === 'finished' ? (
                    <div className={classes.overlay}>
                        <div className={classes.confetti} aria-hidden='true'>
                            {confetti.map((piece, index) => (
                                <span
                                    key={index}
                                    style={{left: piece.left, animationDelay: piece.delay, animationDuration: piece.duration, backgroundColor: piece.color}}
                                />
                            ))}
                        </div>
                        <p className={classes.overlayTitle}>{translate('skills_game_finished')}</p>
                        <p className={classes.subtitle}>{translate('skills_game_finished_text')}</p>
                        <div className={classes.actions}>
                            <Button size='large' onClick={onReplay}>{translate('skills_replay')}</Button>
                            <Button type='primary' size='large' onClick={onViewAll}>{translate('skills_game_view_all')}</Button>
                        </div>
                    </div>
                ) : null}
            </div>

            <p className='sr-only' aria-live='polite'>
                {popup ? translate('skills_game_unlocked', {name: popup.name}) : ''}
            </p>

            {screen === 'playing' ? (
                <div className={classes.controls}>
                    <div className={classes.controlGroup}>
                        <button
                            type='button'
                            className={classes.control}
                            data-control='left'
                            aria-label={translate('skills_control_left')}
                            onPointerDown={handleControlDown}
                            onPointerUp={handleControlUp}
                            onPointerCancel={handleControlUp}
                        >
                            ◀
                        </button>
                        <button
                            type='button'
                            className={classes.control}
                            data-control='right'
                            aria-label={translate('skills_control_right')}
                            onPointerDown={handleControlDown}
                            onPointerUp={handleControlUp}
                            onPointerCancel={handleControlUp}
                        >
                            ▶
                        </button>
                    </div>
                    <button
                        type='button'
                        className={classNames(classes.control, classes.controlJump)}
                        data-control='jump'
                        aria-label={translate('skills_control_jump')}
                        onPointerDown={handleControlDown}
                        onPointerUp={handleControlUp}
                        onPointerCancel={handleControlUp}
                    >
                        ▲
                    </button>
                </div>
            ) : null}
        </div>
    );
}

export default SkillGameComponent;
