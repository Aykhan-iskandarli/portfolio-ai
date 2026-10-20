// Portfolionun tərcümə olunmayan datası (ad, linklər, texnologiyalar, tarixlər, şəkillər).
// Tərcümə olunan mətnlər assets/lang/{az,en,ru}.ts-dədir: key-lər `key` sahəsindən qurulur.
// Bu fayl vite.config.ts-də də import olunur — burada yalnız sadə data olmalıdır (asset import yox).

export const profile = {
    name: 'Aykhan',
    email: 'hello@example.com',
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/',
    photo: '/images/profile.svg',
    cvUrl: '',
};

export const projects = [
    {
        slug: 'task-flow',
        key: 'taskFlow',
        image: '/images/projects/task-flow.svg',
        screenshots: ['/images/projects/task-flow.svg'],
        tech: ['React', 'TypeScript', 'Redux Toolkit', 'Ant Design'],
        liveUrl: 'https://example.com/',
        githubUrl: 'https://github.com/',
    },
    {
        slug: 'weather-now',
        key: 'weatherNow',
        image: '/images/projects/weather-now.svg',
        screenshots: ['/images/projects/weather-now.svg'],
        tech: ['React', 'React Query', 'Vite'],
        liveUrl: 'https://example.com/',
        githubUrl: 'https://github.com/',
    },
    {
        slug: 'shop-lite',
        key: 'shopLite',
        image: '/images/projects/shop-lite.svg',
        screenshots: ['/images/projects/shop-lite.svg'],
        tech: ['React', 'TypeScript', 'Framer Motion', 'JSS'],
        liveUrl: 'https://example.com/',
        githubUrl: 'https://github.com/',
    },
];

// Hər skill-in qısa izahı lang fayllarındadır: `skill_<key>_desc`
export const skillGroups = [
    {
        key: 'frontend',
        icon: 'code',
        items: [
            {key: 'html', name: 'HTML'},
            {key: 'css', name: 'CSS'},
            {key: 'javascript', name: 'JavaScript'},
            {key: 'typescript', name: 'TypeScript'},
            {key: 'react', name: 'React'},
            {key: 'redux', name: 'Redux Toolkit'},
            {key: 'reactQuery', name: 'React Query'},
        ],
    },
    {
        key: 'tools',
        icon: 'tools',
        items: [
            {key: 'vite', name: 'Vite'},
            {key: 'git', name: 'Git'},
            {key: 'jest', name: 'Jest'},
            {key: 'playwright', name: 'Playwright'},
            {key: 'figma', name: 'Figma'},
        ],
    },
    {
        key: 'design',
        icon: 'design',
        items: [
            {key: 'antd', name: 'Ant Design'},
            {key: 'jss', name: 'JSS'},
            {key: 'sass', name: 'SASS'},
            {key: 'framerMotion', name: 'Framer Motion'},
            {key: 'responsive', name: 'Responsive UI'},
            {key: 'a11y', name: 'WCAG / a11y'},
        ],
    },
];

export const experience = [
    {
        key: 'job1',
        company: 'Şirkət A',
        start: '2023',
        end: null,
    },
    {
        key: 'job2',
        company: 'Şirkət B',
        start: '2021',
        end: '2023',
    },
    {
        key: 'job3',
        company: 'Şirkət C',
        start: '2020',
        end: '2021',
    },
];
