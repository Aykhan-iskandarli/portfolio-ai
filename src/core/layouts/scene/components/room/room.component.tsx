import {memo} from 'react';
import colors from 'assets/styles/abstracts/color';
import {useRoomStyles} from './room.style';
import {IBookshelf, IPlant} from './room';

const bookColors = [colors.bookRed, colors.bookBlue, colors.bookGreen, colors.bookYellow, colors.woodLight, colors.posterAlt];
const bookWidths = [18, 24, 16, 22, 28, 18, 20, 26];
const bookHeights = [96, 110, 88, 104, 92, 116, 100, 84];

const Bookshelf = ({x, y, w, h, seed}: IBookshelf) => {
    const rows = 4;
    const rowHeight = (h - 30) / rows;

    return (
        <g>
            <rect x={x + 10} y={y + h - 6} width={w - 20} height={14} rx={4} fill={colors.outline} opacity={0.18}/>
            <rect x={x} y={y} width={w} height={h} rx={8} fill={colors.woodDark} stroke={colors.outline} strokeWidth={4}/>
            <rect x={x + 14} y={y + 14} width={w - 28} height={h - 28} rx={4} fill={colors.wood}/>
            {Array.from({length: rows}).map((_, row) => {
                const shelfY = y + 14 + rowHeight * (row + 1);
                let cursor = x + 22 + ((row + seed) % 3) * 8;
                const books = [];
                for (let i = 0; cursor < x + w - 60; i++) {
                    const index = (i + row * 3 + seed) % bookWidths.length;
                    const bookW = bookWidths[index];
                    const bookH = Math.min(bookHeights[index], rowHeight - 12);
                    const leaning = (i + row + seed) % 7 === 4;
                    books.push(
                        <rect
                            key={i}
                            x={cursor}
                            y={shelfY - bookH}
                            width={bookW}
                            height={bookH}
                            rx={3}
                            fill={bookColors[(index + row) % bookColors.length]}
                            stroke={colors.outline}
                            strokeWidth={2.5}
                            transform={leaning ? `rotate(-12 ${cursor + bookW} ${shelfY})` : undefined}
                        />,
                    );
                    cursor += bookW + (leaning ? 12 : 3);
                }
                return (
                    <g key={row}>
                        {books}
                        <rect x={x + 8} y={shelfY - 2} width={w - 16} height={12} rx={3} fill={colors.woodDark} stroke={colors.outline} strokeWidth={3}/>
                    </g>
                );
            })}
        </g>
    );
};

const Plant = ({x, y, scale = 1, flip = false}: IPlant) => (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
        <path d='M0 0 C -60 -40 -90 -120 -70 -190 C -30 -150 -10 -80 0 0Z' fill={colors.plant} stroke={colors.outline} strokeWidth={4}/>
        <path d='M0 0 C 40 -60 90 -110 150 -120 C 120 -60 60 -20 0 0Z' fill={colors.plantDark} stroke={colors.outline} strokeWidth={4}/>
        <path d='M0 0 C -10 -80 10 -170 60 -230 C 70 -150 40 -60 0 0Z' fill={colors.plant} stroke={colors.outline} strokeWidth={4}/>
        <path d='M0 0 C -70 -10 -140 -50 -170 -100 C -100 -100 -40 -60 0 0Z' fill={colors.plantDark} stroke={colors.outline} strokeWidth={4}/>
        <path d='M-50 0 L 50 0 L 38 90 L -38 90 Z' fill={colors.pot} stroke={colors.outline} strokeWidth={4} strokeLinejoin='round'/>
        <rect x={-58} y={-8} width={116} height={22} rx={6} fill={colors.pot} stroke={colors.outline} strokeWidth={4}/>
    </g>
);

function RoomComponent() {
    const {room} = useRoomStyles();

    return (
        <svg
            className={room}
            viewBox='-400 -200 2400 1700'
            width={2400}
            height={1700}
            aria-hidden='true'
            focusable='false'
        >
            <defs>
                <radialGradient id='room-light' cx='0.45' cy='0.3' r='0.6'>
                    <stop offset='0' stopColor={colors.lampLight} stopOpacity={0.55}/>
                    <stop offset='1' stopColor={colors.lampLight} stopOpacity={0}/>
                </radialGradient>
                <linearGradient id='room-floor' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='0' stopColor={colors.floorDark}/>
                    <stop offset='0.25' stopColor={colors.floor}/>
                    <stop offset='1' stopColor={colors.floorDark}/>
                </linearGradient>
                <linearGradient id='room-glass' x1='0' y1='0' x2='1' y2='1'>
                    <stop offset='0' stopColor={colors.tvLight} stopOpacity={0.35}/>
                    <stop offset='0.4' stopColor={colors.screenGlass} stopOpacity={0}/>
                </linearGradient>
            </defs>

            {/* Divar */}
            <rect x={-400} y={-200} width={2400} height={770} fill={colors.wall}/>
            <rect x={-400} y={420} width={2400} height={150} fill={colors.wallShade} opacity={0.6}/>
            <rect x={-400} y={546} width={2400} height={20} fill={colors.woodDark} stroke={colors.outline} strokeWidth={3}/>

            {/* Döşəmə */}
            <rect x={-400} y={566} width={2400} height={934} fill='url(#room-floor)'/>
            {[620, 690, 775, 880, 1010, 1170, 1360].map((lineY, index) => (
                <g key={lineY}>
                    <line x1={-400} y1={lineY} x2={2000} y2={lineY} stroke={colors.floorLine} strokeWidth={3} opacity={0.45}/>
                    {Array.from({length: 9}).map((_, seam) => {
                        const seamX = -300 + seam * 290 + (index % 2) * 140;
                        return (
                            <line key={seam} x1={seamX} y1={lineY} x2={seamX - 14} y2={lineY + 40 + index * 18} stroke={colors.floorLine} strokeWidth={3} opacity={0.35}/>
                        );
                    })}
                </g>
            ))}

            {/* Posterlər */}
            <g transform='rotate(-3 495 170)'>
                <rect x={430} y={80} width={130} height={176} rx={6} fill={colors.poster} stroke={colors.outline} strokeWidth={4}/>
                <circle cx={495} cy={140} r={22} fill={colors.posterAlt} stroke={colors.outline} strokeWidth={3}/>
                <path d='M450 230 L 495 160 L 540 230 Z' fill={colors.bookBlue} stroke={colors.outline} strokeWidth={3} strokeLinejoin='round'/>
                <rect x={448} y={96} width={94} height={12} rx={3} fill={colors.outline} opacity={0.75}/>
            </g>
            <g transform='rotate(2 850 140)'>
                <rect x={790} y={60} width={124} height={160} rx={6} fill={colors.posterAlt} stroke={colors.outline} strokeWidth={4}/>
                <rect x={812} y={100} width={80} height={70} rx={30} fill={colors.bookGreen} stroke={colors.outline} strokeWidth={3}/>
                <circle cx={838} cy={128} r={6} fill={colors.outline}/>
                <circle cx={866} cy={128} r={6} fill={colors.outline}/>
                <rect x={808} y={188} width={88} height={10} rx={3} fill={colors.outline} opacity={0.7}/>
            </g>

            {/* Divar rəfi */}
            <rect x={1090} y={140} width={210} height={14} rx={4} fill={colors.woodDark} stroke={colors.outline} strokeWidth={3}/>
            <rect x={1110} y={98} width={46} height={42} rx={6} fill={colors.tvDark} stroke={colors.outline} strokeWidth={3}/>
            <circle cx={1133} cy={119} r={11} fill={colors.screenGlass} stroke={colors.outline} strokeWidth={3}/>
            <path d='M1205 140 L 1225 92 L 1245 140 Z' fill={colors.poster} stroke={colors.outline} strokeWidth={3} strokeLinejoin='round'/>
            <rect x={1262} y={110} width={22} height={30} rx={8} fill={colors.bookBlue} stroke={colors.outline} strokeWidth={3}/>

            {/* Kitab rəfləri */}
            <Bookshelf x={20} y={30} w={300} h={620} seed={0}/>
            <Bookshelf x={1360} y={30} w={320} h={620} seed={3}/>

            <rect x={-400} y={30} width={400} height={620} fill={colors.wallShade} opacity={0.35}/>

            {/* İşıq */}
            <rect x={-400} y={-200} width={2400} height={1700} fill='url(#room-light)'/>

            {/* Xalça */}
            <ellipse cx={440} cy={1040} rx={420} ry={140} fill={colors.rug} stroke={colors.outline} strokeWidth={4}/>
            <ellipse cx={440} cy={1040} rx={350} ry={105} fill='none' stroke={colors.rugDark} strokeWidth={6} strokeDasharray='18 14'/>

            {/* Arxa bitki */}
            <Plant x={600} y={470} scale={0.85}/>

            {/* Tumba */}
            <rect x={1010} y={640} width={300} height={16} rx={6} fill={colors.outline} opacity={0.2}/>
            <rect x={1000} y={470} width={320} height={22} rx={6} fill={colors.woodLight} stroke={colors.outline} strokeWidth={4}/>
            <rect x={1012} y={490} width={296} height={150} rx={4} fill={colors.wood} stroke={colors.outline} strokeWidth={4}/>
            <rect x={1030} y={508} width={124} height={112} rx={6} fill={colors.woodDark} stroke={colors.outline} strokeWidth={3}/>
            <rect x={1166} y={508} width={124} height={112} rx={6} fill={colors.woodDark} stroke={colors.outline} strokeWidth={3}/>
            <circle cx={1140} cy={564} r={6} fill={colors.poster} stroke={colors.outline} strokeWidth={2}/>
            <circle cx={1180} cy={564} r={6} fill={colors.poster} stroke={colors.outline} strokeWidth={2}/>
            <rect x={1022} y={638} width={18} height={20} rx={3} fill={colors.woodDark} stroke={colors.outline} strokeWidth={3}/>
            <rect x={1280} y={638} width={18} height={20} rx={3} fill={colors.woodDark} stroke={colors.outline} strokeWidth={3}/>

            {/* CRT televizor */}
            <line x1={1130} y1={252} x2={1080} y2={170} stroke={colors.outline} strokeWidth={5} strokeLinecap='round'/>
            <line x1={1180} y1={252} x2={1236} y2={178} stroke={colors.outline} strokeWidth={5} strokeLinecap='round'/>
            <rect x={1110} y={240} width={90} height={18} rx={9} fill={colors.tvDark} stroke={colors.outline} strokeWidth={4}/>
            <rect x={1100} y={466} width={110} height={10} rx={4} fill={colors.tvDark} stroke={colors.outline} strokeWidth={3}/>
            <rect x={1032} y={252} width={256} height={216} rx={26} fill={colors.tvBody} stroke={colors.outline} strokeWidth={5}/>
            <rect x={1046} y={266} width={218} height={178} rx={20} fill={colors.tvDark} stroke={colors.outline} strokeWidth={3}/>
            <rect x={1062} y={282} width={186} height={146} rx={16} fill={colors.screenGlass}/>
            <rect x={1062} y={282} width={186} height={146} rx={16} fill='url(#room-glass)'/>
            <circle cx={1236} cy={455} r={6} fill={colors.tvDark} stroke={colors.outline} strokeWidth={2}/>
            <circle cx={1216} cy={455} r={6} fill={colors.tvDark} stroke={colors.outline} strokeWidth={2}/>
            <rect x={1060} y={450} width={60} height={8} rx={4} fill={colors.tvDark}/>

            {/* Kabellər */}
            <path d='M905 660 C 960 680, 980 600, 1060 610' fill='none' stroke={colors.cable} strokeWidth={7} strokeLinecap='round'/>
            <path d='M905 690 C 990 720, 1000 640, 1110 640' fill='none' stroke={colors.cable} strokeWidth={7} strokeLinecap='round'/>
            <path d='M640 700 C 560 760, 520 700, 470 760' fill='none' stroke={colors.cable} strokeWidth={6} strokeLinecap='round'/>

            {/* Ön bitkilər */}
            <Plant x={-40} y={930} scale={1.25}/>
            <Plant x={1640} y={920} scale={1.25} flip/>
        </svg>
    );
}

export default memo(RoomComponent);
