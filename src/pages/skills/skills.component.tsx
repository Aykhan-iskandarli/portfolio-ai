import {useCallback, useMemo, useRef, useState} from 'react';
import {Button} from 'antd';
import {useDispatch} from 'react-redux';
import {useReducedMotion} from 'framer-motion';
import {useStore} from 'store/store.config';
import {setUnlockedSkill, setUnlockedSkills} from 'store/store.reducer';
import {Routes} from 'router/routes';
import SeoComponent from 'core/shared/seo/seo.component';
import LoaderComponent from 'core/shared/loader/loader.component';
import PageHeaderComponent from 'core/shared/page-header/page-header.component';
import useLocalization from 'assets/lang';
import colors from 'assets/styles/abstracts/color';
import {useGetSkillGroups} from './actions/skills.query';
import SkillGameComponent from './components/skill-game/skill-game.component';
import SkillPanelComponent from './components/skill-panel/skill-panel.component';
import {useSkillsStyles} from './skills.style';

function SkillsComponent() {
    const translate = useLocalization();
    const dispatch = useDispatch();
    const reduceMotion = useReducedMotion();
    const unlocked = useStore('unlockedSkills');
    const {toolbar, progress, actions} = useSkillsStyles();
    const {data: groups, isLoading} = useGetSkillGroups();

    const panelRef = useRef<HTMLDivElement>(null);
    const [gameKey, setGameKey] = useState(0);

    const allKeys = useMemo(() => (groups ?? []).flatMap((group) => group.items.map((skill) => skill.key ?? '')), [groups]);
    const unlockedCount = allKeys.filter((key) => unlocked.includes(key)).length;
    const allUnlocked = allKeys.length > 0 && unlockedCount === allKeys.length;

    const handleUnlock = useCallback((skillKey: string) => {
        dispatch(setUnlockedSkill(skillKey));
    }, [dispatch]);

    const handleShowAll = useCallback(() => {
        dispatch(setUnlockedSkills(allKeys));
    }, [dispatch, allKeys]);

    const handleViewAll = useCallback(() => {
        panelRef.current?.scrollIntoView({behavior: reduceMotion ? 'auto' : 'smooth', block: 'start'});
        panelRef.current?.focus({preventScroll: true});
    }, [reduceMotion]);

    const handleReplay = useCallback(() => {
        dispatch(setUnlockedSkills([]));
        setGameKey((value) => value + 1);
    }, [dispatch]);

    return (
        <>
            <SeoComponent titleKey='skills_title' descriptionKey='skills_description' path={Routes.skills}/>
            <PageHeaderComponent
                title={translate('skills_title')}
                intro={translate('skills_intro')}
                color={colors.cartridgeSkills}
            />

            {isLoading || !groups ? <LoaderComponent/> : (
                <>
                    <div className={toolbar}>
                        <p className={progress} aria-live='polite'>
                            {translate('skills_progress', {count: reduceMotion ? allKeys.length : unlockedCount, total: allKeys.length})}
                        </p>
                        <div className={actions}>
                            <Button onClick={handleShowAll} disabled={allUnlocked}>{translate('skills_show_all')}</Button>
                            <Button onClick={handleReplay} disabled={unlockedCount === 0}>{translate('skills_replay')}</Button>
                        </div>
                    </div>

                    <SkillGameComponent
                        key={gameKey}
                        groups={groups}
                        unlocked={unlocked}
                        onUnlock={handleUnlock}
                        onViewAll={handleViewAll}
                        onReplay={handleReplay}
                    />

                    {/* Hərəkəti azaldılmış rejimdə bütün skill-lər birbaşa açıq göstərilir */}
                    <SkillPanelComponent ref={panelRef} groups={groups} unlocked={unlocked} showAll={!!reduceMotion}/>
                </>
            )}
        </>
    );
}

export default SkillsComponent;
