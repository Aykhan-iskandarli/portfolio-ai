const mixins = {
    breakpoint: (value: number) => `@media (max-width: ${value}px)`,
    transition: (
        property: string | null = 'all',
        duration: number | null = 0.3,
        timingFunction: string | null = 'ease'
    ) => `${property} ${duration}s ${timingFunction}`,
    reducedMotion: '@media (prefers-reduced-motion: reduce)',
};

export const {breakpoint, transition, reducedMotion} = mixins;
