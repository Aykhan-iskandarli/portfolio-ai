import {KeyboardEvent, PointerEvent, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Button} from 'antd';
import classNames from 'classnames';
import {playBlock, playFlag} from 'core/helpers/sound';
import useLocalization from 'assets/lang';
import fonts from 'assets/styles/abstracts/fonts';
import {buildTrack, createRoadState, HEIGHT, WIDTH} from './engine/track';
import {skipRoad, stepRoad} from './engine/physics';
import {getRoadProgress, renderRoad} from './engine/render';
import {createRoadImages} from './engine/sprites';
import {IRoadEvent, IRoadInput, IRoadJob, IRoadState} from './engine/engine';
import {useCareerRoadStyles} from './career-road.style';
import {ICareerRoad, IRoadScreen} from './career-road';

const keyMap: Record<string, keyof IRoadInput> = {
    ArrowLeft: 'left',
    a: 'left',
    A: 'left',
    ArrowRight: 'right',
    d: 'right',
    D: 'right',
    ArrowUp: 'up',
    w: 'up',
    W: 'up',
    ArrowDown: 'down',
    s: 'down',
    S: 'down',
};

function CareerRoadComponent({jobs, onCheckpoint, onContact}: ICareerRoad) {
    const translate = useLocalization();
    const classes = useCareerRoadStyles();

    const frameRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const progressRef = useRef<HTMLSpanElement>(null);
    const stateRef = useRef<IRoadState | null>(null);
    const imagesRef = useRef<Record<string, HTMLCanvasElement>>({});
    const inputRef = useRef<IRoadInput>({left: false, right: false, up: false, down: false});

    const [screen, setScreen] = useState<IRoadScreen>('title');
    const [activeKey, setActiveKey] = useState<string | null>(null);

    const roadJobs: IRoadJob[] = useMemo(() => jobs.map((job) => ({
        key: job.key ?? '',
        company: job.company ?? '',
        start: job.start ?? '',
        end: job.end,
    })), [jobs]);

    const activeJob = jobs.find((job) => job.key === activeKey);

    const draw = useCallback(() => {
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx && stateRef.current) renderRoad(ctx, stateRef.current, imagesRef.current);
        if (progressRef.current && stateRef.current) {
            progressRef.current.style.width = `${getRoadProgress(stateRef.current) * 100}%`;
        }
    }, []);

    const resetInput = useCallback(() => {
        inputRef.current = {left: false, right: false, up: false, down: false};
    }, []);

    useEffect(() => {
        stateRef.current = createRoadState(buildTrack(roadJobs));
        draw();
    }, [roadJobs, draw]);

    // Lövhələrdəki mətn piksel şriftlə çəkilir — şrift yüklənəndən sonra yaradılır, dil dəyişəndə yenilənir
    useEffect(() => {
        let cancelled = false;
        const labels = {
            now: translate('experience_road_now'),
            nextStop: translate('experience_road_next_stop'),
            yourTeam: translate('experience_road_your_team'),
        };
        document.fonts.load(`700 16px ${fonts.fontPixel}`).catch(() => null).then(() => {
            if (cancelled) return;
            imagesRef.current = createRoadImages(roadJobs, labels);
            draw();
        });
        return () => {
            cancelled = true;
        };
    }, [roadJobs, translate, draw]);

    const handleEvent = useCallback((event: IRoadEvent) => {
        if (event.type === 'job') {
            playBlock();
            setActiveKey(event.jobKey);
            onCheckpoint(event.jobKey);
            return;
        }
        if (event.type === 'finish') {
            playFlag();
            setActiveKey(null);
            return;
        }
        resetInput();
        setScreen('finished');
    }, [onCheckpoint, resetInput]);

    const handleEventRef = useRef(handleEvent);
    handleEventRef.current = handleEvent;

    useEffect(() => {
        if (screen !== 'driving') return;
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
                stepRoad(state, inputRef.current, dt).forEach((event) => handleEventRef.current(event));
                draw();
            }
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [screen, draw]);

    const handleStart = useCallback(() => {
        resetInput();
        if (stateRef.current?.finished) {
            stateRef.current = createRoadState(buildTrack(roadJobs));
            setActiveKey(null);
            onCheckpoint(null);
        }
        setScreen('driving');
    }, [roadJobs, onCheckpoint, resetInput]);

    const handlePause = useCallback(() => {
        resetInput();
        setScreen((value) => (value === 'driving' ? 'paused' : 'driving'));
    }, [resetInput]);

    const handleSkip = useCallback(() => {
        if (!stateRef.current) return;
        skipRoad(stateRef.current).forEach((event) => handleEventRef.current(event));
        setScreen('driving');
    }, []);

    const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
        if (screen !== 'driving' && screen !== 'paused') return;
        if (event.key === 'p' || event.key === 'P') {
            handlePause();
            return;
        }
        const action = keyMap[event.key];
        if (!action || screen !== 'driving') return;
        event.preventDefault();
        inputRef.current[action] = true;
    }, [screen, handlePause]);

    const handleKeyUp = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
        const action = keyMap[event.key];
        if (action) inputRef.current[action] = false;
    }, []);

    const handleControlDown = useCallback((event: PointerEvent<HTMLButtonElement>) => {
        const action = event.currentTarget.dataset.control as keyof IRoadInput;
        event.currentTarget.setPointerCapture(event.pointerId);
        inputRef.current[action] = true;
    }, []);

    const handleControlUp = useCallback((event: PointerEvent<HTMLButtonElement>) => {
        const action = event.currentTarget.dataset.control as keyof IRoadInput;
        inputRef.current[action] = false;
    }, []);

    const playing = screen === 'driving' || screen === 'paused';

    return (
        <div className={classes.road}>
            <div
                ref={frameRef}
                className={classes.frame}
                tabIndex={0}
                role='application'
                aria-label={translate('experience_road_label')}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                onBlur={resetInput}
            >
                <canvas ref={canvasRef} className={classes.canvas} width={WIDTH} height={HEIGHT} aria-hidden='true'/>

                {playing ? (
                    <div className={classes.hud}>
                        <span className={classes.progress} role='presentation' title={translate('experience_road_progress')}>
                            <span ref={progressRef} className={classes.progressFill}/>
                        </span>
                        <button type='button' className={classes.hudButton} onClick={handlePause}>
                            {screen === 'paused' ? translate('experience_road_resume') : translate('experience_road_pause')}
                        </button>
                        <button type='button' className={classes.hudButton} onClick={handleSkip}>
                            {translate('experience_road_skip')}
                        </button>
                    </div>
                ) : null}

                {playing && activeJob ? (
                    <div key={activeJob.key} className={classes.card}>
                        <span className={classes.cardDates}>
                            {activeJob.start} — {activeJob.end ?? translate('experience_present')}
                        </span>
                        <strong className={classes.cardRole}>{translate(`experience_${activeJob.key}_role`)}</strong>
                        <span className={classes.cardCompany}>{activeJob.company}</span>
                        <span className={classes.cardSummary}>{translate(`experience_${activeJob.key}_summary`)}</span>
                    </div>
                ) : null}

                {screen === 'paused' ? (
                    <div className={classNames(classes.overlay, classes.overlayLight)}>
                        <p className={classes.overlayTitle}>{translate('experience_road_pause')}</p>
                    </div>
                ) : null}

                {screen === 'title' ? (
                    <div className={classes.overlay}>
                        <p className={classes.overlayTitle}>{translate('experience_road_title')}</p>
                        <p className={classes.subtitle}>{translate('experience_road_subtitle')}</p>
                        <Button type='primary' size='large' onClick={handleStart}>{translate('experience_road_start')}</Button>
                        <p className={classNames(classes.hint, classes.hintKeys)}>{translate('experience_road_hint')}</p>
                        <p className={classNames(classes.hint, classes.hintTouch)}>{translate('experience_road_hint_touch')}</p>
                    </div>
                ) : null}

                {screen === 'finished' ? (
                    <div className={classes.overlay}>
                        <p className={classes.overlayTitle}>{translate('experience_road_finished')}</p>
                        <p className={classes.subtitle}>{translate('experience_road_finished_text')}</p>
                        <div className={classes.actions}>
                            <Button size='large' onClick={handleStart}>{translate('experience_road_replay')}</Button>
                            <Button type='primary' size='large' onClick={onContact}>{translate('experience_road_contact')}</Button>
                        </div>
                    </div>
                ) : null}
            </div>

            {screen === 'driving' ? (
                <div className={classes.controls}>
                    <button
                        type='button'
                        className={classes.control}
                        data-control='left'
                        aria-label={translate('experience_road_left')}
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
                        aria-label={translate('experience_road_right')}
                        onPointerDown={handleControlDown}
                        onPointerUp={handleControlUp}
                        onPointerCancel={handleControlUp}
                    >
                        ▶
                    </button>
                </div>
            ) : null}
        </div>
    );
}

export default CareerRoadComponent;
