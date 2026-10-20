// Portfolionun tərcümə olunmayan datası (ad, linklər, texnologiyalar, tarixlər, şəkillər).
// Tərcümə olunan mətnlər assets/lang/{az,en,ru}.ts-dədir: key-lər `key` sahəsindən qurulur.
// Bu fayl vite.config.ts-də də import olunur — burada yalnız sadə data olmalıdır (asset import yox).

export const profile = {
    name: 'Alex',
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

export const skillGroups = [
    {
        key: 'frontend',
        icon: 'code',
        items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Redux Toolkit', 'React Query'],
    },
    {
        key: 'tools',
        icon: 'tools',
        items: ['Vite', 'Git', 'Jest', 'Playwright', 'Figma'],
    },
    {
        key: 'design',
        icon: 'design',
        items: ['Ant Design', 'JSS', 'SASS', 'Framer Motion', 'Responsive UI', 'WCAG / a11y'],
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
