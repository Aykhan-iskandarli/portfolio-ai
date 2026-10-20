// Dekorativ ikonlar: aria-hidden. Mənası düymənin aria-label-ı və ya yanındakı mətnlə verilir.
const iconProps = {
    width: '1em',
    height: '1em',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    focusable: false,
};

export const MenuIcon = () => (
    <svg {...iconProps}><path d='M4 6h16M4 12h16M4 18h16'/></svg>
);

export const EjectIcon = () => (
    <svg {...iconProps}><path d='M5 15h14L12 6z'/><path d='M5 19h14'/></svg>
);

export const SoundOnIcon = () => (
    <svg {...iconProps}><path d='M11 5 6 9H3v6h3l5 4z'/><path d='M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13'/></svg>
);

export const SoundOffIcon = () => (
    <svg {...iconProps}><path d='M11 5 6 9H3v6h3l5 4z'/><path d='m22 9-6 6M16 9l6 6'/></svg>
);

export const ArrowLeftIcon = () => (
    <svg {...iconProps}><path d='M19 12H5M12 19l-7-7 7-7'/></svg>
);

export const ExternalIcon = () => (
    <svg {...iconProps}><path d='M14 4h6v6M10 14 20 4M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5'/></svg>
);

export const GithubIcon = () => (
    <svg {...iconProps}><path d='M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21'/></svg>
);

export const LinkedinIcon = () => (
    <svg {...iconProps}><path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z'/><path d='M2 9h4v12H2z'/><circle cx='4' cy='4' r='2'/></svg>
);

export const MailIcon = () => (
    <svg {...iconProps}><rect x='2' y='4' width='20' height='16' rx='2'/><path d='m22 7-10 6L2 7'/></svg>
);

export const DownloadIcon = () => (
    <svg {...iconProps}><path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3'/></svg>
);

export const CodeIcon = () => (
    <svg {...iconProps}><path d='m16 18 6-6-6-6M8 6l-6 6 6 6'/></svg>
);

export const ToolsIcon = () => (
    <svg {...iconProps}><path d='M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z'/></svg>
);

export const DesignIcon = () => (
    <svg {...iconProps}><circle cx='13.5' cy='6.5' r='1.5'/><circle cx='17.5' cy='10.5' r='1.5'/><circle cx='8.5' cy='7.5' r='1.5'/><circle cx='6.5' cy='12.5' r='1.5'/><path d='M12 2a10 10 0 0 0 0 20c1 0 1.6-.8 1.6-1.7 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.9.8-1.7 1.7-1.7h2a5.6 5.6 0 0 0 5.5-5.6C22 6 17.5 2 12 2z'/></svg>
);
