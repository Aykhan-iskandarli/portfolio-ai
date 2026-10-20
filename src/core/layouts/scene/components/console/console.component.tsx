import {motion} from 'framer-motion';
import colors from 'assets/styles/abstracts/color';
import {sceneConfig} from 'core/configs/scene.config';
import {useConsoleStyles} from './console.style';
import {IConsole} from './console';

// layer='body' kartriclərin arxasında, layer='front' isə onların önündə render olunur:
// ön hissə yuvanın qabaq kənarını örtür, kartric "içəri girmiş" görünür.
function ConsoleComponent({layer, ledOn}: IConsole) {
    const {console: consoleClass} = useConsoleStyles();
    const {x, y, w, h} = sceneConfig.console;

    if (layer === 'front') {
        return (
            <svg className={consoleClass} style={{left: x, top: y}} width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden='true' focusable='false'>
                <path d='M86 12 H214 V30 Q214 38 206 38 H94 Q86 38 86 30 Z' fill={colors.consoleBody} stroke={colors.outline} strokeWidth={4} strokeLinejoin='round'/>
                <rect x={92} y={12} width={116} height={5} fill={colors.consoleSlot}/>
            </svg>
        );
    }

    return (
        <svg className={consoleClass} style={{left: x, top: y}} width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden='true' focusable='false'>
            <ellipse cx={150} cy={122} rx={150} ry={10} fill={colors.outline} opacity={0.2}/>
            <rect x={4} y={24} width={292} height={94} rx={22} fill={colors.consoleDark} stroke={colors.outline} strokeWidth={4}/>
            <rect x={14} y={6} width={272} height={70} rx={20} fill={colors.consoleBody} stroke={colors.outline} strokeWidth={4}/>
            <rect x={90} y={0} width={120} height={22} rx={6} fill={colors.consoleBody} stroke={colors.outline} strokeWidth={4}/>
            <rect x={98} y={6} width={104} height={12} rx={3} fill={colors.consoleSlot}/>

            <rect x={30} y={30} width={44} height={10} rx={5} fill={colors.consoleDark}/>
            <rect x={226} y={30} width={44} height={10} rx={5} fill={colors.consoleDark}/>

            <motion.circle
                cx={52}
                cy={92}
                r={8}
                stroke={colors.outline}
                strokeWidth={3}
                initial={false}
                animate={{fill: ledOn ? colors.ledOn : colors.ledOff}}
                transition={{duration: 0.2}}
            />
            {ledOn ? <circle cx={52} cy={92} r={18} fill={colors.ledOn} opacity={0.25}/> : null}

            <rect x={96} y={84} width={34} height={18} rx={5} fill={colors.consoleSlot}/>
            <rect x={170} y={84} width={34} height={18} rx={5} fill={colors.consoleSlot}/>
            <rect x={232} y={84} width={40} height={16} rx={8} fill={colors.cartridgeProjects} stroke={colors.outline} strokeWidth={3}/>
        </svg>
    );
}

export default ConsoleComponent;
