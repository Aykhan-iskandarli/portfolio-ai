import {forwardRef, ReactNode} from 'react';
import classNames from 'classnames';
import useLocalization from 'assets/lang';
import {CodeIcon, DesignIcon, ToolsIcon} from 'assets/images/icons/icons';
import {useSkillPanelStyles} from './skill-panel.style';
import {ISkillPanel} from './skill-panel';

const groupIcons: Record<string, ReactNode> = {
    code: <CodeIcon/>,
    tools: <ToolsIcon/>,
    design: <DesignIcon/>,
};

// Bütün skill-lər həmişə HTML-dədir (SEO, ekran oxuyucu). Kilidli olanlar yalnız vizual olaraq gizlənir.
const SkillPanelComponent = forwardRef<HTMLDivElement, ISkillPanel>(({groups, unlocked, showAll}, ref) => {
    const translate = useLocalization();
    const {panel, group, heading, icon, count, list, card, locked, name, description, lock} = useSkillPanelStyles();

    return (
        <div ref={ref} className={panel} tabIndex={-1}>
            {groups.map((skillGroup) => {
                const opened = skillGroup.items.filter((skill) => showAll || unlocked.includes(skill.key ?? '')).length;
                return (
                    <section key={skillGroup.key} className={group}>
                        <h2 className={heading}>
                            <span className={icon}>{skillGroup.icon ? groupIcons[skillGroup.icon] : null}</span>
                            {translate(`skills_group_${skillGroup.key}`)}
                            <span className={count}>{opened}/{skillGroup.items.length}</span>
                        </h2>
                        <ul className={list}>
                            {skillGroup.items.map((skill) => {
                                const isLocked = !showAll && !unlocked.includes(skill.key ?? '');
                                return (
                                    <li key={skill.key} className={classNames(card, {[locked]: isLocked})}>
                                        {isLocked ? <span className={lock} aria-hidden='true'>?</span> : null}
                                        <span className={name}>
                                            {skill.name}
                                            {isLocked ? <span className='sr-only'> ({translate('skills_locked')})</span> : null}
                                        </span>
                                        <span className={description}>{translate(`skill_${skill.key}_desc`)}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                );
            })}
        </div>
    );
});

SkillPanelComponent.displayName = 'SkillPanelComponent';

export default SkillPanelComponent;
