export const environment = {
    applicationName: 'portfolio',
    siteUrl: (import.meta.env.VITE_SITE_URL || 'https://example.com').replace(/\/$/, ''),
    ogImage: import.meta.env.VITE_OG_IMAGE || '',
};
