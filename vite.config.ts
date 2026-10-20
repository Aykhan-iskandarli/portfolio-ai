import {defineConfig, loadEnv, Plugin} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {Routes} from './src/router/routes';
import {projects} from './src/core/configs/content.config';

// sitemap.xml-ə düşən public, indekslənən route-lar (404 daxil deyil)
const sitemapRoutes = [
    Routes.home,
    Routes.projects,
    ...projects.map((project) => `${Routes.projects}/${project.slug}`),
    Routes.about,
    Routes.skills,
    Routes.experience,
    Routes.contact,
];

// Build vaxtı sitemap.xml və robots.txt-ni VITE_SITE_URL-dən generasiya edir
const seoFilesPlugin = (siteUrl: string, allowIndex: boolean): Plugin => ({
    name: 'seo-files',
    apply: 'build',
    generateBundle() {
        const urls = sitemapRoutes
            .map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`)
            .join('\n');

        this.emitFile({
            type: 'asset',
            fileName: 'sitemap.xml',
            source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        });

        this.emitFile({
            type: 'asset',
            fileName: 'robots.txt',
            source: allowIndex
                ? `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
                : 'User-agent: *\nDisallow: /\n',
        });
    },
});

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), '');
    const siteUrl = (env.VITE_SITE_URL || 'https://example.com').replace(/\/$/, '');

    return {
        plugins: [react(), seoFilesPlugin(siteUrl, env.VITE_ALLOW_INDEX === 'true')],
        resolve: {
            alias: {
                assets: path.resolve(__dirname, 'src/assets'),
                core: path.resolve(__dirname, 'src/core'),
                pages: path.resolve(__dirname, 'src/pages'),
                router: path.resolve(__dirname, 'src/router'),
                store: path.resolve(__dirname, 'src/store'),
            },
        },
    };
});
