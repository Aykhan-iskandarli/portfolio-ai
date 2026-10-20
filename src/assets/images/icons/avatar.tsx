import colors from 'assets/styles/abstracts/color';

// Piksel avatar (orijinal dizayn) — 16x16 grid
const AvatarIcon = ({title}: {title: string}) => (
    <svg viewBox='0 0 16 16' width='100%' height='100%' role='img' aria-label={title} shapeRendering='crispEdges'>
        <rect width='16' height='16' fill={colors.screenGlow} opacity={0.35}/>
        <path d='M4 5h8v5h-1v1H5v-1H4z' fill={colors.skin}/>
        <path d='M4 2h8v1h1v4h-1V5H9v1H6V5H4v2H3V3h1z' fill={colors.woodDark}/>
        <rect x='6' y='7' width='1' height='1' fill={colors.outline}/>
        <rect x='9' y='7' width='1' height='1' fill={colors.outline}/>
        <rect x='7' y='9' width='2' height='1' fill={colors.bookRed}/>
        <path d='M3 12h10v4H3z' fill={colors.bookBlue}/>
        <path d='M7 12h2v2H7z' fill={colors.cartridgeLabel}/>
    </svg>
);

export default AvatarIcon;
