import {ReactNode} from 'react';
import {Routes} from 'router/routes';
import SeoComponent from 'core/shared/seo/seo.component';
import LoaderComponent from 'core/shared/loader/loader.component';
import PageHeaderComponent from 'core/shared/page-header/page-header.component';
import useLocalization from 'assets/lang';
import colors from 'assets/styles/abstracts/color';
import {CodeIcon, DesignIcon, ToolsIcon} from 'assets/images/icons/icons';
import {useGetSkillGroups} from './actions/skills.query';
import {useSkillsStyles} from './skills.style';

const groupIcons: Record<string, ReactNode> = {
    code: <CodeIcon/>,
    tools: <ToolsIcon/>,
    design: <DesignIcon/>,
};

function SkillsComponent() {
    const translate = useLocalization();
    const {grid, group, heading, icon, list, item} = useSkillsStyles();
    const {data: groups, isLoading} = useGetSkillGroups();

    return (
        <>
            <SeoComponent titleKey='skills_title' descriptionKey='skills_description' path={Routes.skills}/>
            <PageHeaderComponent
                title={translate('skills_title')}
                intro={translate('skills_intro')}
                color={colors.cartridgeSkills}
            />
            {isLoading ? <LoaderComponent/> : (
                <div className={grid}>
                    {(groups ?? []).map((skillGroup) => (
                        <section key={skillGroup.key} className={group}>
                            <h2 className={heading}>
                                <span className={icon}>{skillGroup.icon ? groupIcons[skillGroup.icon] : null}</span>
                                {translate(`skills_group_${skillGroup.key}`)}
                            </h2>
                            <ul className={list}>
                                {skillGroup.items.map((skill) => (
                                    <li key={skill} className={item}>{skill}</li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </div>
            )}
        </>
    );
}

export default SkillsComponent;
