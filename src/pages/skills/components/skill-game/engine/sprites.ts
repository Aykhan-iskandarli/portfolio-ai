import colors from 'assets/styles/abstracts/color';

// Piksel sprite-lar: hər simvol bir pikseldir, '.' şəffafdır
export const playerPalette: Record<string, string> = {
    h: colors.woodDark,
    s: colors.skin,
    e: colors.outline,
    m: colors.bookRed,
    b: colors.bookBlue,
    w: colors.cartridgeLabel,
    p: colors.outline,
    o: colors.woodDark,
};

const playerTop = [
    '...hhhhhh...',
    '..hhhhhhhh..',
    '..hssssssh..',
    '..ssessess..',
    '..ssssssss..',
    '...ssmmss...',
    '....ssss....',
    '..bbbbbbbb..',
    '.bbbbbbbbbb.',
    '.sbbbbbbbbs.',
    '.sbbbwwbbbs.',
    '..bbbbbbbb..',
    '..pppppppp..',
];

export const playerIdle = [
    ...playerTop,
    '..ppp..ppp..',
    '..ppp..ppp..',
    '.ooo....ooo.',
];

export const playerRun = [
    ...playerTop,
    '..ppp.ppp...',
    '.ppp...ppp..',
    '.oo.....ooo.',
];

export const playerJump = [
    ...playerTop,
    '.pp......pp.',
    '.pp......pp.',
    'oo........oo',
];

// "?" işarəsi blokun içində (6x8)
export const questionMark = [
    '.####.',
    '##..##',
    '....##',
    '...##.',
    '..##..',
    '..##..',
    '......',
    '..##..',
];
